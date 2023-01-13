<script setup lang="ts">
import { ref, PropType, computed } from 'vue';
import FormGenerator from '@/components/form-generator';
import TableGenerator from '@/components/table-generator';
import useGetPageData from '@/hooks/useGetPageData';
import { IListPageConfig } from '../type';
const props = defineProps({
  /* table和form的config以及初始数据dataRaws */
  listPageConfig: {
    type: Object as PropType<IListPageConfig>,
    required: true
  },
  /* useGetPageData的参数，请求数据函数 */
  getDataFn: {
    type: Function as PropType<(queryInfo: any) => void>,
    required: true
  },
  totalCount: {
    type: Number,
    required: true
  },
  dataSource: {
    type: Array,
    required: true
  }
});

/* 从config里筛出slotNames作为数组，不用useSlots是怕下面动态渲染的插槽和写死的冲突
map内的slotName是必有的，不加非空断言下面动态插槽名就不让用了 */
const slotNames = computed(() => {
  return props.listPageConfig.tableConfig.propList
    .filter(({ slotName }) => !!slotName)
    .map(({ slotName }) => slotName!);
});

const pageFormData = ref(props.listPageConfig.dataRaws);

const { tableGenRef, getPageData, resetTable, searchTable, getNewPageData } =
  useGetPageData(props.getDataFn);

getPageData();
</script>

<template>
  <div class="ListPageGenerator__wrapper">
    <slot name="formGenerator">
      <FormGenerator
        v-bind="props.listPageConfig.formConfig"
        v-model="pageFormData"
        @resetTable="resetTable"
        @searchTable="searchTable"
      >
      </FormGenerator>
    </slot>
    <div class="page__table">
      <slot name="tableGenerator">
        <TableGenerator
          ref="tableGenRef"
          :dataSource="dataSource"
          v-bind="props.listPageConfig.tableConfig"
          :totalCount="totalCount"
          @paginationChange="getNewPageData"
        >
          <!-- 占位子组件的具名插槽，拿数据，然后留具名插槽给父组件，传数据，实现隔层传递 -->
          <template
            v-for="(slotName, index) in slotNames"
            :key="slotName + index"
            #[slotName]="scope"
          >
            <slot :name="slotName" :row="scope.row"></slot>
          </template>
          <!-- 以下是TableGenerator自带的插槽 -->
          <template #headerActions>
            <el-button type="primary"
              >新增{{ props.listPageConfig.tableConfig.tableTitle }}</el-button
            >
            <el-button type="danger">批量删除</el-button>
          </template>
        </TableGenerator>
      </slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.page__table {
  border-top: 2px solid #dbdbdd;
  padding: 20px;
  .el-icon {
    margin-right: 5px;
  }
}
</style>
