<script setup lang="ts">
import { PropType } from 'vue';
import type { IPropItem } from '../type';

defineProps({
  propList: {
    type: Array as PropType<IPropItem[]>,
    required: true
  },
  dataSource: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div class="TableGenerator__wrapper">
    <el-table :data="dataSource" border style="width: 100%">
      <el-table-column
        v-for="propItem in propList"
        :key="propItem.prop"
        v-bind="propItem"
        :align="propItem.align ?? 'center'"
      >
        <template #default="scope">
          <!-- 定制化插槽：在default插槽内放置动态具名插槽，插槽名由使用的组件传入，插槽内容默认放置源数据，再将通过el-table-column作用域插槽获取的数据通过作用域插槽机制反向暴露给使用的组件 -->
          <slot :name="propItem.slotName" :row="scope.row">
            {{ scope.row[propItem.prop] }}
          </slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="less" scoped></style>
