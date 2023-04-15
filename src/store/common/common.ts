import { defineStore } from 'pinia';
import {
  deleteItemByIdRequest,
  createItemRequest,
  editItemByIdRequest
} from '@/service/request/common/common';

const useCommon = defineStore('common', {
  actions: {
    /**
     * @param urls 要删除的数据的请求地址数组
     * @returns 成功删除数据条数
     * @description 自制批量删除操作的actions
     */
    async deleteInBatchesAction(urls: string[]) {
      const deleteRequests = urls.map(url => this.deleteItemByIdAction(url));
      const results = await Promise.allSettled(deleteRequests);
      let successCount = 0;
      for (const res of results) {
        if (res.status === 'fulfilled') {
          if (res.value.code >= 0) successCount++;
        }
      }
      return successCount;
    },
    /**
     * @param url /页面名/itemId
     * @returns 后端返回的code和data（提示）
     * @description 不同页面通过id删除表单item的通用action
     */
    async deleteItemByIdAction(url: string) {
      // 接口有问题，id大于10时，无论是否成功都显示删除成功
      const { code, data } = await deleteItemByIdRequest(url);
      return { code, data };
    },

    /**
     * @param url /页面名
     * @returns 后端返回的code和data（提示）
     * @description 不同页面新建表格item的通用action
     */
    async createItemAction(url: string, params: any) {
      const { code, data } = await createItemRequest(url, params);
      return { code, data };
    },

    /**
     * @param url /页面名/itemId
     * @returns 后端返回的code和data（提示）
     * @description 不同页面通过id修改表格item的通用action
     */
    async editItemByIdAction(url: string, params: any) {
      const { code, data } = await editItemByIdRequest(url, params);
      return { code, data };
    }
  }
});

export default useCommon;
