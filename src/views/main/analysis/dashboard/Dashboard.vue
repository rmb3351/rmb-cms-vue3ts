<!-- 商品统计页面 -->
<script setup lang="ts">
import { computed } from 'vue';
import PieChart from '@/components/pie-chart';
import useDashboard from '@/store/dashboard/dashboard';
const dashboardStore = useDashboard();
dashboardStore.dashboardGetDataAction();
const pieData = computed(() => {
  return dashboardStore.categorySaleList.map(item => ({
    value: item.goodsCount,
    name: item.name
  }));
});
</script>

<template>
  <div class="Dashboard__wrapper">
    <PieChart :pie-data="pieData"></PieChart>
  </div>
</template>

<style lang="less" scoped></style>
