import { defineStore } from 'pinia';
import type { ILoginInfo } from './type';
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenuByRoleId
} from '@/service/request/login/login';
import loCache from '@/utils/loCache';
import { IMenus } from '@/service/request/login/type';
import router from '@/router';
const useLogin = defineStore('login', {
  state: () => ({
    userInfo: {},
    token: '',
    userMenus: [] as IMenus[]
  }),
  actions: {
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
    }
  }
});

export default useLogin;
