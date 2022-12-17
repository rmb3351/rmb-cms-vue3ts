export interface IAccount {
  name: string;
  password: string;
}

export interface ILoginResult {
  id: number;
  name: string;
  token: string;
}

/* 请求返回的数据类型，通用，所以给个泛型 */
export interface IDataType<T = any> {
  code: number;
  data: T;
}

/* 角色信息相关类型，用json2ts生成 */
export interface IUserInfo {
  id: number;
  name: string;
  realname: string;
  cellphone: number;
  enable: number;
  createAt: string;
  updateAt: string;
  role: IRole;
  department: IDepartment;
}

interface IDepartment {
  id: number;
  name: string;
  parentId?: number;
  createAt: string;
  updateAt: string;
  leader: string;
}

interface IRole {
  id: number;
  name: string;
  intro: string;
  createAt: string;
  updateAt: string;
}

/* 用户菜单相关类型，用json2ts生成 */
export interface IMenus {
  id: number;
  name: string;
  type: number;
  url: string;
  icon: string;
  sort: number;
  children: IChildMenus[];
}

interface IChildMenus {
  id: number;
  url?: string | null;
  name: string;
  sort?: number | null;
  type: number;
  children?: (IChildMenus | any[] | null)[];
  parentId: number;
  permission?: string;
}
