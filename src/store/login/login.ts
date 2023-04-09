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
const useLogin = defineStore('login', {
  state: () => ({
    userInfo: {} as IUserInfo,
    token: '',
    userMenus: [] as IMenus[],
    permissions: [] as string[]
  }),
  actions: {
    changeUserMenus() {
      mapMenusToRoutes(this.userMenus);
      /* 补充故事列表模块的权限操作 */
      this.permissions = [
        ...mapMenuToPermissions(this.userMenus),
        'system:story:create',
        'system:story:query'
      ];
      loCache.set('permissions', this.permissions);
    },
    async accountLoginAction(loginInfo: IAccount) {
      /* 三个请求有先后顺序，必须依次调用，且所有数据都在本地存一份 */
      const {
        data: { token, id }
      } = await accountLoginRequest(loginInfo);
      this.token = token;
      loCache.set('token', token);

      const userInfo = await getUserInfoById(id);
      this.userInfo = userInfo.data;
      loCache.set('userInfo', this.userInfo);

      const userMenus = await getUserMenuByRoleId(userInfo.data.role.id);
      this.userMenus = userMenus.data;
      loCache.set('userMenus', this.userMenus);
      this.changeUserMenus();
    },
    /* 刷新后从localStorage同步login的几个state */
    syncLocalData() {
      const token = loCache.get('token');
      if (token) this.token = token;
      else return;
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
