<!-- 商品统计页面 -->
<script setup lang="ts">
import useDashboard from '@/store/dashboard/dashboard';
const dashboardStore = useDashboard();
dashboardStore.dashboardGetDataAction();
</script>

<template>
  <div class="Dashboard__wrapper"></div>
</template>

<style lang="less" scoped></style>
