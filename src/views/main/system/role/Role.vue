<!-- 角色管理页面 -->
<script setup lang="ts">
import ListPageGenerator from '@/components/list-page-generator';
import { listPageConfig } from './config/config';
import useSystem from '@/store/system/system';
const systemStore = useSystem();
</script>

<template>
  <div class="Role__wrapper">
    <ListPageGenerator
      :listPageConfig="listPageConfig"
      :getDataFn="systemStore.roleManagementAction"
      :dataSource="systemStore.roleLists"
      :totalCount="systemStore.roleCount"
    >
    </ListPageGenerator>
  </div>
</template>

<style lang="less" scoped></style>
