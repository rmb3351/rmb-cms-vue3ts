// IMenuList用到的菜单接口
import type { IMenus } from '../login/type';
import type { IListParams, IListsResult } from '../type';
/* 系统管理子页面的请求参数类型 */
export interface IUserParams extends IListParams {
  name?: string;
  realname?: string;
  cellphone?: string;
  enable?: string;
  createAt?: string;
  updateAt?: string;
}

export interface IRoleParams extends IListParams {
  name?: string;
  intro?: string;
  createAt?: string;
  updateAt?: string;
}

/* 系统管理子页面的结果参数类型 */
export interface IUserListsResult extends IListsResult {
  list: IUserListItem[];
}

export interface IUserListItem {
  id: number;
  name: string;
  realname: string;
  cellphone: number;
  enable: number;
  departmentId: number;
  roleId: number;
  createAt: string;
  updateAt: string;
}

export interface IRoleListsResult extends IListsResult {
  list: IRoleListItem[];
}

export interface IRoleListItem {
  id: number;
  name: string;
  intro: string;
  createAt: string;
  updateAt: string;
  menuList: IMenuList[];
}

interface IMenuList {
  id: number;
  name: string;
  type: number;
  url: string;
  icon: string;
  sort: number;
  children: IMenus[];
}
