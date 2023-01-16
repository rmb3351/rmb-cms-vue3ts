<script setup lang="ts">
import commonCol from '../commonColConfig';
import { IPermissionType } from '@/hooks/usePermission';
</script>

<template>
  <el-table-column
    v-for="propItem in commonCol"
    :key="propItem.prop"
    v-bind="propItem"
    :align="propItem.align ?? 'center'"
  >
    <template #default="scope">
      <template v-if="propItem.prop === 'actions'">
        <el-button type="primary" v-has="IPermissionType['update']">
          <el-icon>
            <Edit />
          </el-icon>
          编辑</el-button
        >
        <el-button type="danger" v-has="IPermissionType['delete']">
          <el-icon>
            <Delete />
          </el-icon>
          删除</el-button
        >
      </template>
      <template v-else>
        <span>{{ $formatter.formatUtcString(scope.row[propItem.prop]) }}</span>
      </template>
    </template>
  </el-table-column>
</template>

<style lang="less" scoped></style>
