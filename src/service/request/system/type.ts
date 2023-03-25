// IMenuList用到的菜单接口
import type { IMenus } from '../login/type';
import type { IListParams, IListsResult } from '../type';
/* 系统管理子页面的请求参数类型 */
export interface IUserParams extends IListParams {
  name?: string;
  realname?: string;
  cellphone?: string;
  enable?: string;
}
export interface IMenuParams extends IListParams {
  name?: string;
  type?: number;
  url?: string;
}

export interface IRoleParams extends IListParams {
  name?: string;
  intro?: string;
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

// 仿照上面的roleList相关类型限制来一份department的
export interface IDepartmentListsResult extends IListsResult {
  list: IDepartmentListItem[];
}
export interface IDepartmentListItem {
  id: number;
  name: string;
  parentId?: number;
  createAt: string;
  updateAt: string;
  leader: string;
}

/* 角色管理里用到的menu接口 */
interface IMenuList {
  id: number;
  name: string;
  type: number;
  url: string;
  icon: string;
  sort: number;
  children: IMenus[] | null;
}

/* 菜单管理里用到的menu接口 */
export interface IMenuListsResult {
  list: IMenuListItem[];
}

export interface IMenuListItem extends IMenus {
  createAt: string;
  updateAt: string;
}
