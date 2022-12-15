import { defineStore } from 'pinia';
import type { ILoginInfo } from './type';
import { accountLoginRequest } from '@/service/request/login/login';
const useLogin = defineStore('login', {
  state: () => ({
    userInfo: {},
    token: ''
  }),
  actions: {
    async accountLoginAction(loginInfo: ILoginInfo) {
      const {
        data: { token }
      } = await accountLoginRequest(loginInfo);
      console.log(token);
    }
  }
});

export default useLogin;
