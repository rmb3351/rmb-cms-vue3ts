import { defineStore } from 'pinia';
import {
  getAddressSale,
  getCategoryCount,
  getCategoryFavor,
  getCategorySale
} from '@/service/request/dashboard/dashboard';
import type {
  IAddressSaleItem,
  ICategoryFavorItem,
  ICategorySaleItem
} from '@/service/request/dashboard/type';
const useDashboard = defineStore('dashboard', {
  state: () => ({
    addressSaleList: [] as IAddressSaleItem[],
    categoryCountList: [] as ICategorySaleItem[],
    categorySaleList: [] as ICategorySaleItem[],
    categoryFavorList: [] as ICategoryFavorItem[]
  }),
  actions: {
    async dashboardGetDataAction() {
      /* 多个请求没有相互关联，并发 */
      const addressListRes = getAddressSale();
      const categoryCountRes = getCategoryCount();
      const categoryFavorRes = getCategoryFavor();
      const categorySaleRes = getCategorySale();
      this.addressSaleList = (await addressListRes).data;
      this.categoryCountList = (await categoryCountRes).data;
      this.categoryFavorList = (await categoryFavorRes).data;
      this.categorySaleList = (await categorySaleRes).data;
    }
  }
});

export default useDashboard;
