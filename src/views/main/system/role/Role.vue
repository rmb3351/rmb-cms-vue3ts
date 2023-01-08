<!-- 角色管理页面 -->
<script setup lang="ts">
import { ref } from 'vue';
import FormGenerator from '@/components/form-generator';
import TableGenerator from '@/components/table-generator';
import {
  roleFormConfig,
  formDataFields,
  roleTableConfig
} from './config/config';
import useSystem from '@/store/system/system';
const roleFormData = ref(formDataFields);

const systemStore = useSystem();
if (!systemStore.roleLists.length) {
  systemStore.roleManagementAction({ offset: 0, size: 10 });
}
</script>

<template>
  <div class="Role__wrapper">
    <FormGenerator v-bind="roleFormConfig" v-model="roleFormData">
    </FormGenerator>
    <div class="role__table">
      <TableGenerator
        :dataSource="systemStore.roleLists"
        v-bind="roleTableConfig"
      >
        <!-- 定制化插槽的使用 -->
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
