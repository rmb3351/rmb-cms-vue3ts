import { defineStore } from 'pinia';
import type { ILoginInfo } from './type';
import type { RouteRecordRaw } from 'vue-router';
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenuByRoleId
} from '@/service/request/login/login';
import loCache from '@/utils/loCache';
import { IMenus } from '@/service/request/login/type';
import router from '@/router';
import { mapMenusToRoutes } from '@/utils/mapMenus';
const useLogin = defineStore('login', {
  state: () => ({
    userInfo: {},
    token: '',
    userMenus: [] as IMenus[]
  }),
  actions: {
    changeUserMenus() {
      mapMenusToRoutes(this.userMenus);
    },
    async accountLoginAction(loginInfo: ILoginInfo) {
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

      router.push('/main');
    },
    /* 刷新后从localStorage同步login的几个state */
    syncLocalData() {
      const token = loCache.get('token');
      if (token) this.token = token;
      const userInfo = loCache.get('userInfo');
      if (userInfo) this.userInfo = userInfo;
      const userMenus = loCache.get('userMenus');
      if (userMenus) this.userMenus = userMenus;
      const routes = loCache.saferGet('routes', ['component']);
      if (routes)
        routes.forEach((route: RouteRecordRaw) => {
          if (!router.hasRoute(route.name!)) router.addRoute('main', route);
        });
    }
  }
});

export default useLogin;
