import { defineStore } from 'pinia';
import {
  goodsListRequest,
  cateListRequest
} from '@/service/request/product/product';
import {
  IGoodsParams,
  ICategoryParams,
  IGoodListItem,
  ICategoryListItem
} from '@/service/request/product/type';

const useProduct = defineStore('product', {
  state: () => ({
    goodLists: [] as IGoodListItem[],
    goodCount: 0,
    categoryLists: [] as ICategoryListItem[],
    cateCount: 0
  }),
  actions: {
    async goodsInfoAction(goodsParams: IGoodsParams) {
      const {
        data: { list, totalCount }
      } = await goodsListRequest(goodsParams);
      this.goodLists = list;
      this.goodCount = totalCount;
    },
    async categoryInfoAction(cateParams: ICategoryParams) {
      const {
        data: { list, totalCount }
      } = await cateListRequest(cateParams);
      this.categoryLists = list;
      this.cateCount = totalCount;
    }
  }
});

export default useProduct;
