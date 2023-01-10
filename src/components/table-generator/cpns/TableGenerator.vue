<script setup lang="ts">
import { PropType, ref } from 'vue';
import type { IPropItem } from '../type';
import { INIT_PAGESIZE } from '../constants';
import TableCommonCol from './TableCommonCol.vue';

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
  },
  totalCount: {
    type: Number,
    required: true
  },
  showCommonCol: {
    type: Boolean,
    default: false
  }
});

/* 选项改变时提交table数据 */
const emits = defineEmits(['tableSelectionChange', 'paginationChange']);
function handleSelectionChange(values: any[]) {
  // 交由父组件监听tableSelectionChannge处理
  emits('tableSelectionChange', values);
}

/* 表尾默认分页器相关属性和方法 */
const pagination = ref({ currentPage: 1, pageSize: INIT_PAGESIZE });

function handlePaginationChange() {
  emits('paginationChange', pagination.value);
}

/* 供父组件中的FormGenerator重置分页器页码的方法 */
function resetCurrentPage() {
  pagination.value.currentPage = 1;
}
defineExpose({ resetCurrentPage });
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
          <slot
            v-if="propItem.slotName"
            :name="propItem.slotName"
            :row="scope.row"
          >
            {{ scope.row[propItem.prop] }}
          </slot>
        </template>
      </el-table-column>
      <!-- 写死公共列 -->
      <TableCommonCol v-if="showCommonCol"> </TableCommonCol>
    </el-table>
    <!-- 表尾插槽 -->
    <div class="table__footer">
      <slot name="tableFooter">
        <el-pagination
          v-model:currentPage="pagination.currentPage"
          v-model:pageSize="pagination.pageSize"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
          @size-change="handlePaginationChange"
          @current-change="handlePaginationChange"
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
