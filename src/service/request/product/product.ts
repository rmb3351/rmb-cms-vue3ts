import rmbRequest from '@/service';
import { IDataType } from '../type';
import {
  IGoodsParams,
  ICategoryParams,
  IGoodListsResult,
  ICategoryListsResult
} from './type';

enum ProductAPI {
  GoodsList = '/goods/list',
  CategoryList = '/category/list'
}

export function goodsListRequest(data: IGoodsParams) {
  return rmbRequest.post<IDataType<IGoodListsResult>>({
    url: ProductAPI.GoodsList,
    data
  });
}

export function cateListRequest(data: ICategoryParams) {
  return rmbRequest.post<IDataType<ICategoryListsResult>>({
    url: ProductAPI.CategoryList,
    data
  });
}
