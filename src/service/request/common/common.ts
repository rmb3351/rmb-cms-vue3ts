import rmbRequest from '@/service';
import type { IDataType } from '../type';

/**
 * @param url /页面名/itemId
 * @description 不同页面通过id删除表格item的通用请求
 */
export function deleteItemByIdRequest(url: string) {
  // post可以传泛型定义返回数据类型，IDataType又可以传泛型定义返回的data类型
  return rmbRequest.delete<IDataType<string>>({
    url
  });
}

/**
 * @param url /页面名
 * @description 不同页面新建表格item的通用请求
 */
export function createItemRequest(url: string, data: any) {
  return rmbRequest.post<IDataType<string>>({
    url,
    data
  });
}

/**
 * @param url /页面名/itemId
 * @description 不同页面通过id编辑表格item的通用请求
 */
export function editItemByIdRequest(url: string, data: any) {
  return rmbRequest.patch<IDataType<string>>({
    url,
    data
  });
}
