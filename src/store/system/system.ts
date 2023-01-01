import { defineStore } from 'pinia';
import { usersListRequest } from '@/service/request/system/system';
import type { IUserParams, IUserListItem } from '@/service/request/system/type';
const useSystem = defineStore('system', {
  state: () => ({
    userLists: [] as IUserListItem[],
    userCount: 0
  }),
  actions: {
    async userManagementAction(userParams: IUserParams) {
      const {
        data: { list, totalCount }
      } = await usersListRequest(userParams);
      this.userLists = list;
      this.userCount = totalCount;
    }
  }
});

export default useSystem;
