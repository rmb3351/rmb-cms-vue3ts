import { defineStore } from 'pinia';
import type { IAccount, IUserInfo } from '@/service/request/login/type';
import type { RouteRecordRaw } from 'vue-router';
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenuByRoleId
} from '@/service/request/login/login';
import loCache from '@/utils/loCache';
import { IMenus } from '@/service/request/login/type';
import router from '@/router';
import { mapMenusToRoutes, mapMenuToPermissions } from '@/utils/mapMenus';
import { TOKEN_EXPIRES } from './constants';
const useLogin = defineStore('login', {
  state: () => ({
    userInfo: {} as IUserInfo,
    token: '',
    tokenExpireTime: 0,
    userMenus: [] as IMenus[],
    permissions: [] as string[]
  }),
  actions: {
    changeUserMenus() {
      mapMenusToRoutes(this.userMenus);
      /* 故事列表模块的权限操作 */
      this.permissions = mapMenuToPermissions(this.userMenus).filter(
        permission => !permission.includes('story')
      );
      this.permissions = [
        ...this.permissions,
        'system:story:create',
        'system:story:query',
        'system:story:detail' // 故事独有的详情权限
      ];
      loCache.set('permissions', this.permissions);
    },
    async accountLoginAction(loginInfo: IAccount) {
      /* 三个请求有先后顺序，必须依次调用，且所有数据都在本地存一份 */
      const {
        data: { token, id }
      } = await accountLoginRequest(loginInfo);
      this.token = token;
      this.tokenExpireTime = Date.now() + TOKEN_EXPIRES;
      loCache.set('token', token);
      loCache.set('tokenExpireTime', this.tokenExpireTime);

      const userInfo = await getUserInfoById(id);
      this.userInfo = userInfo.data;
      loCache.set('userInfo', this.userInfo);

      const userMenus = await getUserMenuByRoleId(userInfo.data.role.id);
      this.userMenus = userMenus.data;
      loCache.set('userMenus', this.userMenus);
      this.changeUserMenus();
    },
    /* 刷新后从localStorage同步login的几个state，并判断是否应该退出登录 */
    syncLocalStatus() {
      const token = loCache.get('token');
      if (token) this.token = token;
      else return;
      const tokenExpireTime = loCache.get('tokenExpireTime');
      if (!tokenExpireTime || tokenExpireTime <= Date.now()) {
        loCache.remove('token');
        ElMessage.error('您的登录已经过期，请重新登录！');
        return;
      }
      const userInfo = loCache.get('userInfo');
      const userMenus = loCache.get('userMenus');
      const routes = loCache.saferGet('routes', ['component']);
      const permissions = loCache.get('permissions');
      /* 以下四个没有哪个都会导致效果异常，所以直接删掉token让重新登录获取，由于main.ts中本函数执行在use(router)之前，所以守卫的钩子比这个函数晚执行 */
      if (!userInfo || !userMenus || !routes || !permissions) {
        loCache.remove('token');
        return;
      }
      this.userInfo = userInfo;
      this.userMenus = userMenus;
      routes.forEach((route: RouteRecordRaw) => {
        if (!router.hasRoute(route.name!)) router.addRoute('main', route);
      });
      this.permissions = permissions;
    }
  }
});

export default useLogin;
