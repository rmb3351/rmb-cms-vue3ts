<!-- 部门管理页面 -->
<script setup lang="ts">
import { computed } from 'vue';
import ListPageGenerator from '@/components/list-page-generator';
import { listPageConfig } from './config/config';
import useSystem from '@/store/system/system';
const systemStore = useSystem();
const parentDepartment = computed(
  () => (id: number) =>
    systemStore.entireDepartmentList?.find(dep => dep.id === id)?.name ||
    '未知部门'
);

/* 更新部门的下拉列表 */
const listPageConfigRef = computed(() => {
  const { formConfig, modalConfig } = listPageConfig;
  /* 数组满足ISelectOptions即可，不做导入了 */
  const departmentOptions = systemStore.entireDepartmentList.map(dep => ({
    value: dep.id,
    label: dep.name
  }));
  formConfig.formItems?.forEach(item => {
    if (item.field === 'parentId') item.options = departmentOptions;
  });
  modalConfig.formItems?.forEach(item => {
    if (item.field === 'parentId') item.options = departmentOptions;
  });
  return listPageConfig;
});
</script>

<template>
  <div class="Department__wrapper">
    <ListPageGenerator
      :listPageConfig="listPageConfigRef"
      :getDataFn="systemStore.departmentManagementAction"
      :dataSource="systemStore.departmentLists"
      :totalCount="systemStore.departmentCount"
    >
      <template #parentId="scope">
        <span>{{ parentDepartment(scope.row.parentId) }}</span>
      </template>
    </ListPageGenerator>
  </div>
</template>

<style lang="less" scoped></style>
