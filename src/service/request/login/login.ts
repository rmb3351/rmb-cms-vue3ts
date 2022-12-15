import rmbRequest from '@/service';
import type { IAccount, ILoginResult, IDataType } from './type';

enum LoginAPI {
  AccountLogin = '/login'
}

export function accountLoginRequest(account: IAccount) {
  // post可以传泛型定义返回数据类型，IDataType又可以传泛型定义data类型
  return rmbRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  });
}
