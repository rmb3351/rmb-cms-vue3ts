export interface IUserParams {
  offset: number;
  size: number;
  name?: string;
}

export interface IUserListsResult {
  list: IUserListItem[];
  totalCount: number;
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
