export interface ILoginInfo {
  name: string;
  password: string;
}

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
  parentId?: any;
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
