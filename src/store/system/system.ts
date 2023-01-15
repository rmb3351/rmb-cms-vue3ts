import { defineStore } from 'pinia';
import {
  usersListRequest,
  roleListRequest,
  menuListRequest
} from '@/service/request/system/system';
import type {
  IUserParams,
  IRoleParams,
  IUserListItem,
  IRoleListItem,
  IMenuListItem
} from '@/service/request/system/type';
const useSystem = defineStore('system', {
  state: () => ({
    userLists: [] as IUserListItem[],
    userCount: 0,
    roleLists: [] as IRoleListItem[],
    roleCount: 0,
    menuLists: [] as IMenuListItem[]
  }),
  actions: {
    async userManagementAction(userParams: IUserParams) {
      const {
        data: { list, totalCount }
      } = await usersListRequest(userParams);
      this.userLists = list;
      this.userCount = totalCount;
    },
    async roleManagementAction(roleParams: IRoleParams) {
      const {
        data: { list, totalCount }
      } = await roleListRequest(roleParams);
      this.roleLists = list;
      this.roleCount = totalCount;
    },
    async menuManagementAction() {
      const res = await menuListRequest();
      const {
        data: { list }
      } = await menuListRequest();
      this.menuLists = list;
    }
  }
});

export default useSystem;
