import { defineStore } from 'pinia';
import {
  usersListRequest,
  roleListRequest,
  menuListRequest,
  getEntireDepartmentList,
  getEntireRoleList
} from '@/service/request/system/system';
import type {
  IUserParams,
  IRoleParams,
  IUserListItem,
  IRoleListItem,
  IDepartmentListItem,
  IMenuListItem
} from '@/service/request/system/type';
const useSystem = defineStore('system', {
  state: () => ({
    userLists: [] as IUserListItem[],
    userCount: 0,
    entireDepartmentList: [] as IDepartmentListItem[],
    entireRoleList: [] as IRoleListItem[],
    roleLists: [] as IRoleListItem[],
    roleCount: 0,
    menuLists: [] as IMenuListItem[]
  }),
  actions: {
    async userManagementAction(userParams: IUserParams) {
      /* 多个请求没有相互关联，并发 */
      const userListRes = usersListRequest(userParams);
      const depListRes = getEntireDepartmentList();
      const roleListRes = getEntireRoleList();
      this.userLists = (await userListRes).data.list;
      this.userCount = (await userListRes).data.totalCount;
      this.entireDepartmentList = (await depListRes).data.list;
      this.entireRoleList = (await roleListRes).data.list;
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
