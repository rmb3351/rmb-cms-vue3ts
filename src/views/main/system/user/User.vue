<!-- 用户管理页面 -->
<script setup lang="ts">
import { computed } from 'vue';
import ListPageGenerator from '@/components/list-page-generator';
import { listPageConfig } from './config/config';
import useSystem from '@/store/system/system';

/* 获取用户数据 */
const systemStore = useSystem();

/* 渲染部门和角色名 */
const departmentText = computed(() => {
  return (id: number) =>
    systemStore.entireDepartmentList.find(dep => dep.id === id)?.name;
});
const roleText = computed(() => {
  return (id: number) =>
    systemStore.entireRoleList.find(role => role.id === id)?.name;
});

/* 更新部门和角色的下拉列表 */
const listPageConfigRef = computed(() => {
  const { formConfig, modalConfig } = listPageConfig;
  /* 这里两个数组满足ISelectOptions即可，不做导入了 */
  const departmentOptions = systemStore.entireDepartmentList.map(dep => ({
    value: dep.id,
    label: dep.name
  }));
  const roleOptions = systemStore.entireRoleList.map(role => ({
    value: role.id,
    label: role.name
  }));
  formConfig.formItems?.forEach(item => {
    if (item.field === 'departmentId') item.options = departmentOptions;
    else if (item.field === 'roleId') item.options = roleOptions;
  });
  modalConfig.formItems?.forEach(item => {
    if (item.field === 'departmentId') item.options = departmentOptions;
    else if (item.field === 'roleId') item.options = roleOptions;
  });
  return listPageConfig;
});
</script>

<template>
  <div class="User__wrapper">
    <ListPageGenerator
      :listPageConfig="listPageConfigRef"
      :getDataFn="systemStore.userManagementAction"
      :dataSource="systemStore.userLists"
      :totalCount="systemStore.userCount"
    >
      <!-- TableGenerator内定制化插槽的使用 -->
      <template #department="scope">
        <span>{{ departmentText(scope.row.departmentId) }}</span>
      </template>
      <template #role="scope">
        <span>{{ roleText(scope.row.roleId) }}</span>
      </template>
      <template #status="scope">
        <span>{{ scope.row.enable === 1 ? '在用' : '弃用' }}</span>
      </template>
    </ListPageGenerator>
  </div>
</template>

<style lang="less" scoped></style>
