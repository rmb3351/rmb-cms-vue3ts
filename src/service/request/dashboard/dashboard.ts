import rmbRequest from '@/service';
import { IDataType } from '../type';
import {
  IAddressSaleItem,
  ICategorySaleItem,
  ICategoryFavorItem
} from './type';

enum IDashboardAPI {
  CategoryCount = '/goods/category/count',
  CategorySale = '/goods/category/sale',
  CategoryFavor = '/goods/category/favor',
  AddressSale = '/goods/address/sale'
}

/* 前两个返回的字段和类型完全一致，共用类型 */
export function getCategoryCount() {
  return rmbRequest.get<IDataType<ICategorySaleItem[]>>({
    url: IDashboardAPI.CategoryCount
  });
}

export function getCategorySale() {
  return rmbRequest.get<IDataType<ICategorySaleItem[]>>({
    url: IDashboardAPI.CategorySale
  });
}

export function getCategoryFavor() {
  return rmbRequest.get<IDataType<ICategoryFavorItem[]>>({
    url: IDashboardAPI.CategoryFavor
  });
}
export function getAddressSale() {
  return rmbRequest.get<IDataType<IAddressSaleItem[]>>({
    url: IDashboardAPI.AddressSale
  });
}
