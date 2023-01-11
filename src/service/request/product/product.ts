import rmbRequest from '@/service';
import { IDataType } from '../type';
import { IGoodsParams, IGoodListsResult } from './type';

enum ProductAPI {
  GoodsList = '/goods/list'
}

export function goodsListRequest(data: IGoodsParams) {
  return rmbRequest.post<IDataType<IGoodListsResult>>({
    url: ProductAPI.GoodsList,
    data
  });
}
