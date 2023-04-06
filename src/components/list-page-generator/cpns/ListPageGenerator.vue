<script setup lang="ts">
import { ref, computed } from 'vue';
import FormGenerator from '@/components/form-generator';
import TableGenerator from '@/components/table-generator';
import ModalGenerator from '@/components/modal-generator';
import useGetPageData from '@/hooks/useGetPageData';
import usePermission, { IPermissionType } from '@/hooks/usePermission';
import { IListPageConfig } from '../type';
const props = withDefaults(
  defineProps<{
    /* table和form的config以及初始数据dataRaws */
    listPageConfig: IListPageConfig;
    /* useGetPageData的参数，请求数据函数 */
    getDataFn: (queryInfo: any) => void;
    totalCount?: number;
    dataSource: Record<string, any>[];
    /* ModalGenerator内接收的额外数据，在提交表单时并入提交数据 */
    modalExtraInfo?: Record<string, any>;
  }>(),
  {
    totalCount: 0,
    modalExtraInfo: () => ({})
  }
);

/* 从config里筛出slotNames作为数组，不用useSlots是怕下面动态渲染的插槽和写死的冲突
map内的slotName是必有的，不加非空断言下面动态插槽名就不让用了 */
const slotNames = computed(() => {
  return props.listPageConfig.tableConfig.propList
    .filter(({ slotName }) => !!slotName)
    .map(({ slotName }) => slotName!);
});

const pageFormData = ref(props.listPageConfig.dataRaws);

const canQuery = usePermission(IPermissionType['query']);

/**
 * @description 组件内的查询页面数据的函数
 * @param queryInfo 查询条件，包含分页器对象属性
 */
function getPageData(queryInfo: any) {
  // 没权限则返回
  if (!canQuery) return;
  props.getDataFn(queryInfo);
}

const {
  tableGenRef,
  resetTable,
  searchTable,
  getNewPageData,
  searchAfterModify
} = useGetPageData(getPageData);

resetTable();

/* modal关联逻辑处理 */
const modalRef = ref<InstanceType<typeof ModalGenerator>>();
const emits = defineEmits(['emitItemData']);
/* 处理新建、编辑按钮的点击并将数据同步给ModalGenerator */
function createOrEditItem(type: 'create' | 'edit', data?: any) {
  modalRef.value!.modalVisible = true;
  const isCreate = type === 'create';
  const formDataRaw = isCreate ? props.listPageConfig.dataRaws : data;
  modalRef.value!.modalFormData = formDataRaw;
  // 将itemData发射出去，以便外层页面拿到修改数据
  if (!isCreate) emits('emitItemData', formDataRaw);
  modalRef.value!.modalIsCreate = isCreate;
}
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
          @getNewPageData="getNewPageData"
          @itemEditClick="itemData => createOrEditItem('edit', itemData)"
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
            <el-button
              type="primary"
              v-has="IPermissionType['create']"
              @click="createOrEditItem('create')"
              >新增{{ props.listPageConfig.tableConfig.tableTitle }}</el-button
            >
            <el-button type="danger" v-has="IPermissionType['delete']"
              >批量删除</el-button
            >
          </template>
        </TableGenerator>
      </slot>
    </div>
    <slot name="modalGenerator">
      <ModalGenerator
        ref="modalRef"
        :modalConfig="props.listPageConfig.modalConfig"
        :modalExtraInfo="props.modalExtraInfo"
        @searchAfterModify="searchAfterModify"
      >
        <!-- 把ModalGenerator内的默认插槽往上暴露 -->
        <template #default>
          <slot></slot>
        </template>
      </ModalGenerator>
    </slot>
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
