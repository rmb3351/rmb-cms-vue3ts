<script setup lang="ts">
import { computed } from 'vue';
import BaseChart from '@/components/base-chart';
const props = defineProps<{
  pieData: any[];
}>();

/* pieOptions会根据pieData的更新重新生成并传入BaseChart，其余配置写死 */
const pieOptions = computed(() => ({
  legend: {
    top: 'bottom'
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  series: [
    {
      name: 'Nightingale Chart',
      type: 'pie',
      radius: [50, 250],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8
      },
      data: props.pieData
    }
  ]
}));
</script>

<template>
  <div class="PieChart__wrapper">
    <BaseChart :options="pieOptions" height="650px"></BaseChart>
  </div>
</template>

<style lang="less" scoped></style>
