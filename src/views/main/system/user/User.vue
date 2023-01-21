<!-- 用户管理页面 -->
<script setup lang="ts">
import ListPageGenerator from '@/components/list-page-generator';
import { listPageConfig } from './config/config';
import useSystem from '@/store/system/system';

/* 获取用户数据 */
const systemStore = useSystem();
</script>

<template>
  <div class="User__wrapper">
    <ListPageGenerator
      :listPageConfig="listPageConfig"
      :getDataFn="systemStore.userManagementAction"
      :dataSource="systemStore.userLists"
      :totalCount="systemStore.userCount"
    >
      <!-- TableGenerator内定制化插槽的使用 -->
      <template #status="scope">
        <span>{{ scope.row.enable === 1 ? '在用' : '弃用' }}</span>
      </template>
    </ListPageGenerator>
  </div>
</template>

<style lang="less" scoped></style>
