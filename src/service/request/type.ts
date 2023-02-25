import type { AxiosRequestConfig, AxiosResponse } from 'axios';

/* 可以传入的拦截器类型，全部可选,并对responseInterceptor接收泛型T，方便发请求的promise里响应拦截器对返回的响应res进行操作和赋值 */
export interface RMBRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (err: any) => any;
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (err: any) => any;
}

/* 在axios默认的config类型基础上添加可选拦截器类型 */
export interface RMBRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: RMBRequestInterceptors<T>;
  showLoading?: boolean;
}

/* 请求返回的数据类型，通用，所以给个泛型 */
export interface IDataType<T = any> {
  code: number;
  data: T;
}

/* 对于系统内的list的请求参数和结果类型的抽取 */
export interface IListParams {
  offset: number;
  size: number;
}

export interface IListsResult {
  list: any[];
  totalCount: number;
}
