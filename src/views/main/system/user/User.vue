<!-- 用户管理页面 -->
<script setup lang="ts">
import { ref } from 'vue';
import FormGenerator from '@/components/form-generator';
import TableGenerator from '@/components/table-generator';
import {
  userFormConfig,
  formDataFields,
  userTableConfig
} from './config/config';
import useSystem from '@/store/system/system';

const userFormData = ref(formDataFields);

/* 获取用户数据 */
const systemStore = useSystem();
systemStore.userManagementAction({
  offset: 0,
  size: 10
});
</script>

<template>
  <div class="User__wrapper">
    <FormGenerator v-bind="userFormConfig" v-model="userFormData">
    </FormGenerator>
    <div class="user__table">
      <TableGenerator
        :dataSource="systemStore.userLists"
        v-bind="userTableConfig"
      >
        <!-- 定制化插槽的使用 -->
        <template #status="scope">
          <span>{{ scope.row.enable === 1 ? '在用' : '弃用' }}</span>
        </template>
        <template #createAt="scope">
          <span>{{ $formatter.formatUtcString(scope.row.createAt) }}</span>
        </template>
        <template #updateAt="scope">
          <span>{{ $formatter.formatUtcString(scope.row.updateAt) }}</span>
        </template>
        <template #actions>
          <el-button type="primary">
            <el-icon>
              <Edit />
            </el-icon>
            编辑</el-button
          >
          <el-button type="danger">
            <el-icon>
              <Delete />
            </el-icon>
            删除</el-button
          >
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
