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
