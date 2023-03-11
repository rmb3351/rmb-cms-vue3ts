import RMBRequest from './request/request';
import { BASE_URL, TIME_OUT } from './request/config';
import loCache from '@/utils/loCache';
const rmbRequest = new RMBRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor(config) {
      const token = loCache.get('token');
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    responseInterceptor(res) {
      return res;
    }
  }
});
export default rmbRequest;

/* 用法如下
enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}

export function accountLoginRequest(account: IAccount) {
  // post可以传泛型定义返回数据类型，IDataType又可以传泛型定义它内部的data属性的类型
  return rmbRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  });
}
*/
