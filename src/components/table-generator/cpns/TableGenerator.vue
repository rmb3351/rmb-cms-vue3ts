<script setup lang="ts">
import { PropType, ref } from 'vue';
import type { IPropItem } from '../type';

defineProps({
  propList: {
    type: Array as PropType<IPropItem[]>,
    required: true
  },
  dataSource: {
    type: Array,
    required: true
  },
  isShowSelection: {
    type: Boolean,
    default: false
  },
  isShowIndex: {
    type: Boolean,
    default: false
  },
  tableTitle: {
    type: String,
    default: ''
  }
});

/* 选项改变时提交table数据 */
const emits = defineEmits(['tableSelectionChannge']);
function handleSelectionChange(values: any[]) {
  // 交由父组件监听tableSelectionChannge处理
  emits('tableSelectionChannge', values);
}

/* 表尾默认分页器相关属性和方法 */
const currentPage = ref(4);
const pageSize = ref(100);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};
</script>

<template>
  <div class="TableGenerator__wrapper">
    <!-- 表头插槽 -->
    <div class="table__header">
      <slot name="tableHeader">
        <span class="header__title">{{ tableTitle }}</span>
        <div class="header__actions">
          <slot name="headerActions"></slot>
        </div>
      </slot>
    </div>
    <!-- 表格内容 -->
    <el-table
      :data="dataSource"
      border
      style="width: 100%"
      @selectionChange="handleSelectionChange"
    >
      <el-table-column
        v-if="isShowSelection"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        v-if="isShowIndex"
        type="index"
        width="80"
        align="center"
        label="序号"
      ></el-table-column>
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
    <!-- 表尾插槽 -->
    <div class="table__footer">
      <slot name="tableFooter">
        <el-pagination
          v-model:currentPage="currentPage"
          v-model:pageSize="pageSize"
          :page-sizes="[100, 200, 300, 400]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.table__header {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  margin-bottom: 15px;
  .header__title {
    font-size: 20px;
    font-weight: 700;
  }
}

.table__footer {
  margin-top: 15px;
  padding: 0 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
