<!-- 角色管理页面 -->
<script setup lang="ts">
import { ref, nextTick } from 'vue';
/* 全局自动引入后再用具体的指定引入，会有问题 */
import { ElTree as Tree } from 'element-plus';
import ListPageGenerator from '@/components/list-page-generator';
import { listPageConfig } from './config/config';
import useSystem from '@/store/system/system';
import type { ICheckedStatusObj, IRoleExtraInfo, IRoleInfo } from './type';
import { getMenuLeafNodeKeys } from '@/utils/mapMenus';
const systemStore = useSystem();
/* 记录选中的节点，作为额外数据modalExtraInfo的属性传入ModalGenerator */
const modalExtraInfo = ref<IRoleExtraInfo>({});
function getCheckedNodes(
  _: any,
  { checkedKeys, halfCheckedKeys }: ICheckedStatusObj
) {
  const menuList = [...checkedKeys, ...halfCheckedKeys];
  modalExtraInfo.value.menuList = menuList;
}

/* 回显选中的节点并设置给tree */
const treeRef = ref<InstanceType<typeof Tree>>();
function setCheckedNodes(itemData: IRoleInfo) {
  const checkedKeys = getMenuLeafNodeKeys(itemData.menuList);
  nextTick(() => {
    treeRef.value!.setCheckedKeys(checkedKeys);
  });
}
</script>

<template>
  <div class="Role__wrapper">
    <ListPageGenerator
      :listPageConfig="listPageConfig"
      :getDataFn="systemStore.roleManagementAction"
      :dataSource="systemStore.roleLists"
      :totalCount="systemStore.roleCount"
      :modalExtraInfo="modalExtraInfo"
      @emitItemData="setCheckedNodes"
    >
      <template #default>
        <div class="tree__wrapper">
          <span>角色权限：</span>
          <el-tree
            ref="treeRef"
            :data="systemStore.entireMenuList"
            showCheckbox
            nodeKey="id"
            :props="{ label: 'name', children: 'children' }"
            @check="getCheckedNodes"
          >
          </el-tree>
        </div>
      </template>
    </ListPageGenerator>
  </div>
</template>

<style lang="less" scoped>
.tree__wrapper {
  span {
    margin-left: 73px;
  }
  .el-tree {
    margin-left: 120px;
  }
}
</style>
