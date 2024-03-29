import rmbRequest from '@/service';
import type { IAccount, ILoginResult, IUserInfo, IMenus } from './type';
import type { IDataType } from '../type';

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

export function getUserInfoById(id: number) {
  return rmbRequest.get<IDataType<IUserInfo>>({
    url: LoginAPI.LoginUserInfo + id
  });
}

export function getUserMenuByRoleId(roleId: number) {
  return rmbRequest.get<IDataType<IMenus[]>>({
    url: LoginAPI.UserMenus + roleId + '/menu'
  });
}
