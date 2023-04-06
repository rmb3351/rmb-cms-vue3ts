import { defineStore } from 'pinia';
import {
  usersListRequest,
  roleListRequest,
  menuListRequest,
  departmentListRequest,
  getEntireDepartmentList,
  getEntireRoleList,
  getEntireMenuList
} from '@/service/request/system/system';
import type {
  IUserParams,
  IMenuParams,
  IRoleParams,
  IDepartmentParams,
  IUserListItem,
  IRoleListItem,
  IDepartmentListItem,
  IMenuListItem
} from '@/service/request/system/type';
const useSystem = defineStore('system', {
  state: () => ({
    userLists: [] as IUserListItem[],
    userCount: 0,
    departmentLists: [] as IDepartmentListItem[],
    departmentCount: 0,
    entireDepartmentList: [] as IDepartmentListItem[],
    entireRoleList: [] as IRoleListItem[],
    entireMenuList: [] as IMenuListItem[],
    roleLists: [] as IRoleListItem[],
    roleCount: 0,
    menuLists: [] as IMenuListItem[]
  }),
  actions: {
    async departmentManagementAction(departmentParams: IDepartmentParams) {
      /* 多个请求没有相互关联，并发 */
      const curDepListRes = departmentListRequest(departmentParams);
      const depListRes = getEntireDepartmentList();
      this.entireDepartmentList = (await depListRes).data.list;
      this.departmentLists = (await curDepListRes).data.list;
      this.departmentCount = (await curDepListRes).data.totalCount;
    },
    async userManagementAction(userParams: IUserParams) {
      /* 多个请求没有相互关联，并发 */
      const curUserListRes = usersListRequest(userParams);
      const depListRes = getEntireDepartmentList();
      const roleListRes = getEntireRoleList();
      this.userLists = (await curUserListRes).data.list;
      this.userCount = (await curUserListRes).data.totalCount;
      this.entireDepartmentList = (await depListRes).data.list;
      this.entireRoleList = (await roleListRes).data.list;
    },
    async roleManagementAction(roleParams: IRoleParams) {
      /* 多个请求没有相互关联，并发 */
      const curRoleListRes = roleListRequest(roleParams);
      const menuListRes = getEntireMenuList();
      this.roleLists = (await curRoleListRes).data.list;
      this.roleCount = (await curRoleListRes).data.totalCount;
      this.entireMenuList = (await menuListRes).data.list;
    },
    async menuManagementAction(menuParams: IMenuParams) {
      const {
        data: { list }
      } = await menuListRequest(menuParams);
      this.menuLists = list;
    }
  }
});

export default useSystem;
