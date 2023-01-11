import type { IListParams, IListsResult } from '../type';
/* 商品中心子页面的请求参数类型 */
export interface IGoodsParams extends IListParams {}

/* 商品中心子页面的请求结果类型 */
export interface IGoodListsResult extends IListsResult {
  list: IGoodListItem[];
}

interface IGoodListItem {
  id: number;
  name: string;
  oldPrice: string;
  newPrice: string;
  desc: string;
  status: number;
  imgUrl: string;
  inventoryCount: number;
  saleCount: number;
  favorCount: number;
  address: string;
  categoryId: number;
  createAt: string;
  updateAt: string;
}
