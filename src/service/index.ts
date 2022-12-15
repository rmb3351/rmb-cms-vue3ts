import RMBRequest from './request/request';
import { BASE_URL, TIME_OUT } from './request/config';
const rmbRequest = new RMBRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor(config) {
      const token = '';
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    responseInterceptor(res) {
      console.log('配置的实例响应拦截器');
      return res;
    }
  }
});
export default rmbRequest;

/* 用法如下
interface DataType {
  data: any;
  returnCode: string;
  success: boolean;
  _id?: string;
}

rmbRequest
  .get<DataType>({
    url: '/home/multidata',
    showLoading: false
  })
  .then(res => {
    console.log(res);
  });
*/
