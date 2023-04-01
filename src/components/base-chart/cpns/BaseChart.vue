<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import useChart from '@/hooks/useChart';
import type { IOption } from '../type';
const props = withDefaults(
  defineProps<{
    width?: string;
    height?: string;
    options: IOption;
  }>(),
  {
    width: '100%',
    height: '360px'
  }
);
const chartRef = ref<HTMLDivElement>();
onMounted(() => {
  const { chartInstance, setOptions, updateSize } = useChart(chartRef.value!);
  watchEffect(() => setOptions(props.options)); // 只要options改变则重新setOptions
});
</script>

<template>
  <div class="BaseEchart__wrapper">
    <div
      ref="chartRef"
      :style="`width:${props.width};height:${props.height};`"
    ></div>
  </div>
</template>

<style lang="less" scoped></style>
