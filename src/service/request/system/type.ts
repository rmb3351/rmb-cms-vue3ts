// IMenuList用到的菜单接口
import type { IMenus } from '../login/type';
/* 对系统管理子页面的请求参数做抽取 */
interface ISystemParams {
  offset: number;
  size: number;
}

export interface IUserParams extends ISystemParams {
  name?: string;
  realname?: string;
  cellphone?: string;
  enable?: string;
  createAt?: string;
  updateAt?: string;
}

export interface IRoleParams extends ISystemParams {
  name?: string;
  intro?: string;
  createAt?: string;
  updateAt?: string;
}

/* 对系统管理子页面的结果做抽取 */
interface ISystemListsResult {
  list: any[];
  totalCount: number;
}
export interface IUserListsResult extends ISystemListsResult {
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

export interface IRoleListsResult extends ISystemListsResult {
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
