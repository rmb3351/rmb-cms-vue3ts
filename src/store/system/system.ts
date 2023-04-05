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
      const curDepListRes = departmentListRequest(departmentParams);
      // entire类的有数据即可，不需要重复请求
      if (!this.entireDepartmentList.length) {
        // 全部的也要，做上级部门筛选用
        const depListRes = getEntireDepartmentList();
        this.entireDepartmentList = (await depListRes).data.list;
      }
      this.departmentLists = (await curDepListRes).data.list;
      this.departmentCount = (await curDepListRes).data.totalCount;
    },
    async userManagementAction(userParams: IUserParams) {
      /* 多个请求没有相互关联，并发 */
      const curUserListRes = usersListRequest(userParams);
      this.userLists = (await curUserListRes).data.list;
      this.userCount = (await curUserListRes).data.totalCount;
      if (!this.entireDepartmentList.length) {
        const depListRes = getEntireDepartmentList();
        this.entireDepartmentList = (await depListRes).data.list;
      }
      if (!this.entireRoleList.length) {
        const roleListRes = getEntireRoleList();
        this.entireRoleList = (await roleListRes).data.list;
      }
    },
    async roleManagementAction(roleParams: IRoleParams) {
      /* 多个请求没有相互关联，并发 */
      const curRoleListRes = roleListRequest(roleParams);
      this.roleLists = (await curRoleListRes).data.list;
      this.roleCount = (await curRoleListRes).data.totalCount;
      if (!this.entireMenuList.length) {
        const menuListRes = getEntireMenuList();
        this.entireMenuList = (await menuListRes).data.list;
      }
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
