<!-- 用户管理页面 -->
<script setup lang="ts">
import { ref } from 'vue';
import FormGenerator from '@/components/form-generator';
import TableGenerator from '@/components/table-generator';
import { userFormConfig, formDataRaws, userTableConfig } from './config/config';
import useSystem from '@/store/system/system';
import useGetPageData from '@/hooks/useGetPageData';

const userFormData = ref(formDataRaws);
/* 获取用户数据 */
const systemStore = useSystem();
const { tableGenRef, getPageData, resetTable, searchTable, getNewPageData } =
  useGetPageData(systemStore.userManagementAction);

getPageData();
</script>

<template>
  <div class="User__wrapper">
    <FormGenerator
      v-bind="userFormConfig"
      v-model="userFormData"
      @resetTable="resetTable"
      @searchTable="searchTable"
    >
    </FormGenerator>
    <div class="user__table">
      <TableGenerator
        ref="tableGenRef"
        :dataSource="systemStore.userLists"
        v-bind="userTableConfig"
        :totalCount="systemStore.userCount"
        @paginationChange="getNewPageData"
      >
        <!-- 定制化插槽的使用 -->
        <template #status="scope">
          <span>{{ scope.row.enable === 1 ? '在用' : '弃用' }}</span>
        </template>
        <!-- 以下是TableGenerator自带的插槽 -->
        <template #headerActions>
          <el-button type="primary">新增用户</el-button>
          <el-button type="danger">批量删除</el-button>
        </template>
      </TableGenerator>
    </div>
  </div>
</template>

<style lang="less" scoped>
.user__table {
  border-top: 2px solid #dbdbdd;
  padding: 20px;
  .el-icon {
    margin-right: 5px;
  }
}
</style>
