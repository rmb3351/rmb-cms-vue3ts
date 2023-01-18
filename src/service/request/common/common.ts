import rmbRequest from '@/service';
import type { IDataType } from '../type';

/**
 * @param url /页面名/itemId
 * @description 不同页面通过id删除表单item的通用请求
 */
export function deleteItemByIdRequest(url: string) {
  // post可以传泛型定义返回数据类型，IDataType又可以传泛型定义data类型
  return rmbRequest.delete<IDataType<string>>({
    url
  });
}
