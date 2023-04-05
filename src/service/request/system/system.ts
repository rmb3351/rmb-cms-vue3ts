import rmbRequest from '@/service';
import {
  IUserParams,
  IMenuParams,
  IRoleParams,
  IDepartmentParams,
  IUserListsResult,
  IRoleListsResult,
  IMenuListsResult,
  IDepartmentListsResult
} from './type';
import type { IDataType } from '../type';

enum SystemAPI {
  UsersList = '/users/list',
  RoleList = '/role/list',
  MenuList = '/menu/list',
  DepartmentList = '/department/list'
}

export function usersListRequest(data: IUserParams) {
  // post可以传泛型定义返回数据类型，IDataType又可以传泛型定义返回的data类型
  return rmbRequest.post<IDataType<IUserListsResult>>({
    url: SystemAPI.UsersList,
    data
  });
}

export function roleListRequest(data: IRoleParams) {
  return rmbRequest.post<IDataType<IRoleListsResult>>({
    url: SystemAPI.RoleList,
    data
  });
}

export function menuListRequest(data: IMenuParams) {
  return rmbRequest.post<IDataType<IMenuListsResult>>({
    url: SystemAPI.MenuList,
    data
  });
}

export function departmentListRequest(data: IDepartmentParams) {
  return rmbRequest.post<IDataType<IDepartmentListsResult>>({
    url: SystemAPI.DepartmentList,
    data
  });
}

export function getEntireDepartmentList() {
  return rmbRequest.post<IDataType<IDepartmentListsResult>>({
    url: SystemAPI.DepartmentList,
    data: { offset: 0, size: 1000 }
  });
}

export function getEntireRoleList() {
  return rmbRequest.post<IDataType<IRoleListsResult>>({
    url: SystemAPI.RoleList,
    data: { offset: 0, size: 1000 }
  });
}

export function getEntireMenuList() {
  return rmbRequest.post<IDataType<IMenuListsResult>>({
    url: SystemAPI.MenuList
  });
}
