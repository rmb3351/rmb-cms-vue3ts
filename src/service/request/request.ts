import axios from 'axios';
import type { AxiosInstance } from 'axios';
/* 因为不是按组件形式使用，所以配置的自动按需引入无效，这里手动加上：elloading的按需引入、调用service返回的实例类型、el-loading的样式文件 */
import { ElLoading } from 'element-plus';
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading';
import 'element-plus/theme-chalk/el-loading.css';
import type { RMBRequestConfig, RMBRequestInterceptors } from './type';

const SHOW_LOADING_DEFAULT = true;

/* 请求封装类 */
class RMBRequest {
  instance: AxiosInstance;
  interceptors?: RMBRequestInterceptors;
  /* showLoading准确控制是否展示loading，instanceShowLoading记录instance的showLoading配置项，作为每次还原的基准 */
  showLoading: boolean;
  instanceShowLoading: boolean;
  // loading实例在element-plus中的类型
  loadingInstance?: LoadingInstance;

  constructor(config: RMBRequestConfig) {
    /* 每次创建这个请求封装类的实例后就根据传入的config创建新的axios实例
    并根据传入的配置来配置实例的loading动画、拦截器等 */
    this.instance = axios.create(config);
    this.instanceShowLoading = config.showLoading ?? SHOW_LOADING_DEFAULT;
    this.showLoading = this.instanceShowLoading;
    this.interceptors = config.interceptors;
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    /* 这里可以配置所有请求都有的拦截器 */
    this.instance.interceptors.request.use(config => {
      // 如果showLoading为true，再给loadingInstance赋值，后面好关
      if (this.showLoading)
        this.loadingInstance = ElLoading.service({
          lock: true,
          text: '请求加载中，请稍等',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      return config;
    });
    this.instance.interceptors.response.use(
      res => {
        this.loadingInstance?.close();
        return res.data;
      },
      err => {
        this.loadingInstance?.close();
        console.error(`默认响应拦截器拦截到异常：${err}`);
        return err;
      }
    );
  }

  /* 泛型T让调用请求时传入，限制Promise的返回值类型（即限制resolve内res的类型）、响应拦截器的参数和返回值类型、axios实例的request的promise返回值类型res类型 */
  request<T>(config: RMBRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 有单请求的请求拦截器的，执行传入的单请求拦截器
      if (config.interceptors?.requestInterceptor)
        config = config.interceptors.requestInterceptor(config);
      // 和默认配置不相同时再做修改
      if (config.showLoading === !this.instanceShowLoading)
        this.showLoading = !this.instanceShowLoading;

      // 让axios的request返回的res从推导AxiosResponse类型转为传入的T类型
      this.instance
        .request<any, T>(config)
        .then(res => {
          // 有单请求的响应拦截器的，执行传入的单请求拦截器
          if (config.interceptors?.responseInterceptor)
            res = config.interceptors.responseInterceptor(res);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        })
        .finally(() => {
          // 还原showLoading，不影响下次请求
          this.showLoading = this.instanceShowLoading;
        });
    });
  }

  /* 这里调用request时，传不传泛型T都一样，会默认传递 */
  get<T>(config: RMBRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'get' });
  }
  post<T>(config: RMBRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'post' });
  }
  delete<T>(config: RMBRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'delete' });
  }
  put<T>(config: RMBRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'put' });
  }
}
export default RMBRequest;
