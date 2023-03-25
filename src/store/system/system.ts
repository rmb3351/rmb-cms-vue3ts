import { defineStore } from 'pinia';
import {
  usersListRequest,
  roleListRequest,
  menuListRequest,
  getEntireDepartmentList,
  getEntireRoleList,
  getEntireMenuList
} from '@/service/request/system/system';
import type {
  IUserParams,
  IMenuParams,
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
    entireMenuList: [] as IMenuListItem[],
    roleLists: [] as IRoleListItem[],
    roleCount: 0,
    menuLists: [] as IMenuListItem[]
  }),
  actions: {
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

/*
这个问题可能是因为 el-tree 的样式没有正常加载造成的，可以尝试以下几个方法来解决：

确认是否引入了 element-plus 的样式文件，包括 CSS 和主题文件；

确认是否在 main.js 中引入了 element-plus 的样式，例如：

import 'element-plus/lib/theme-chalk/index.css';
尝试给 el-tree 组件设置一个固定的高度，例如：

<el-tree style="height: 500px;"></el-tree>
如果上述方法都不行，可以尝试在 el-tree 组件外包裹一个容器，并给容器设置一个固定高度和 overflow: auto 样式，例如：

<div style="height: 500px; overflow: auto;">
  <el-tree></el-tree>
</div>
至于点击节点时没有出现鼠标样式，可能是因为样式文件没有加载或者被覆盖了，可以在浏览器控制台查看样式是否正常加载，并检查是否有其他样式覆盖了鼠标样式。
*/
