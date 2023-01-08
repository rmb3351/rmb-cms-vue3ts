import rmbRequest from '@/service';
import {
  IUserParams,
  IRoleParams,
  IUserListsResult,
  IRoleListsResult
} from './type';
import type { IDataType } from '../type';

enum SystemAPI {
  UsersList = '/users/list',
  RoleList = '/role/list'
}

export function usersListRequest(data: IUserParams) {
  // post可以传泛型定义返回数据类型，IDataType又可以传泛型定义data类型
  return rmbRequest.post<IDataType<IUserListsResult>>({
    url: SystemAPI.UsersList,
    data
  });
}

export function roleListRequest(data: IRoleParams) {
  // post可以传泛型定义返回数据类型，IDataType又可以传泛型定义data类型
  return rmbRequest.post<IDataType<IRoleListsResult>>({
    url: SystemAPI.RoleList,
    data
  });
}
