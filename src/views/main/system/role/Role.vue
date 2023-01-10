<!-- 角色管理页面 -->
<script setup lang="ts">
import { ref } from 'vue';
import FormGenerator from '@/components/form-generator';
import TableGenerator from '@/components/table-generator';
import { roleFormConfig, formDataRaws, roleTableConfig } from './config/config';
import useSystem from '@/store/system/system';
import useGetPageData from '@/hooks/useGetPageData';
const roleFormData = ref(formDataRaws);
const systemStore = useSystem();

const { tableGenRef, getPageData, resetTable, searchTable, getNewPageData } =
  useGetPageData(systemStore.roleManagementAction);

getPageData();
</script>

<template>
  <div class="Role__wrapper">
    <FormGenerator
      v-bind="roleFormConfig"
      v-model="roleFormData"
      @resetTable="resetTable"
      @searchTable="searchTable"
    >
    </FormGenerator>
    <div class="role__table">
      <TableGenerator
        ref="tableGenRef"
        :dataSource="systemStore.roleLists"
        v-bind="roleTableConfig"
        :totalCount="systemStore.roleCount"
        @paginationChange="getNewPageData"
      >
        <!-- 以下是TableGenerator自带的插槽 -->
        <template #headerActions>
          <el-button type="primary">新增角色</el-button>
          <el-button type="danger">批量删除</el-button>
        </template>
      </TableGenerator>
    </div>
  </div>
</template>

<style lang="less" scoped>
.role__table {
  border-top: 2px solid #dbdbdd;
  padding: 20px;
  .el-icon {
    margin-right: 5px;
  }
}
</style>
