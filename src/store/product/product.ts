import { defineStore } from 'pinia';
import { goodsListRequest } from '@/service/request/product/product';
import { IGoodsParams } from '@/service/request/product/type';

const useProduct = defineStore('product', {
  state: () => ({
    goodLists: [] as any[],
    goodCount: 0
  }),
  actions: {
    async goodsInfoAction(goodsParams: IGoodsParams) {
      const {
        data: { list, totalCount }
      } = await goodsListRequest(goodsParams);
      this.goodLists = list;
      this.goodCount = totalCount;
    }
  }
});

export default useProduct;
