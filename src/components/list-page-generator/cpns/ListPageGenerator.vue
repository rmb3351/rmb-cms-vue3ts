<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { InfoFilled } from '@element-plus/icons-vue';
import FormGenerator from '@/components/form-generator';
import TableGenerator from '@/components/table-generator';
import ModalGenerator from '@/components/modal-generator';
import useGetPageData from '@/hooks/useGetPageData';
import usePermission, { IPermissionType } from '@/hooks/usePermission';
import { IListPageConfig } from '../type';
import { getPageName } from '@/utils/mapPageName';
import useCommon from '@/store/common/common';
import type { AnyObject } from '@/global/type';
import type { IListParams } from '@/service/request/type';
const props = withDefaults(
  defineProps<{
    /* table和form的config以及初始数据dataRaws */
    listPageConfig: IListPageConfig;
    /* useGetPageData的参数，请求数据函数 */
    getDataFn: (queryInfo: IListParams) => void;
    totalCount?: number;
    dataSource: AnyObject[];
    /* ModalGenerator内接收的额外数据，在提交表单时并入提交数据 */
    modalExtraInfo?: AnyObject;
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
function getPageData(queryInfo: AnyObject) {
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
/* 数据量更改后，当前所在页数调整，避免页数超界，不过这里用不上 */
watch(
  () => props.totalCount,
  newVal => {
    const tableEl = tableGenRef.value;
    if (!tableEl || !tableEl.pagination) return;
    const { currentPage, pageSize } = tableEl.pagination;
    if (newVal < (currentPage - 1) * pageSize)
      tableEl.pagination.currentPage = Math.max(
        Math.ceil(newVal / pageSize),
        1
      );
  }
);

const emits = defineEmits<{
  (e: 'emitItemData', itemData: AnyObject): void;
  (e: 'viewItemData', itemData: AnyObject): void;
}>();
/* modal关联逻辑处理 */
const modalRef = ref<InstanceType<typeof ModalGenerator>>();
/* 处理新建、编辑按钮的点击并将数据同步给ModalGenerator */
function createOrEditItem(type: 'create' | 'edit', data?: AnyObject) {
  modalRef.value!.modalVisible = true;
  const isCreate = type === 'create';
  const formDataRaw = isCreate ? props.listPageConfig.dataRaws : data!;
  modalRef.value!.modalFormData = formDataRaw;
  // 将itemData发射出去，以便外层页面拿到修改数据
  if (!isCreate) emits('emitItemData', formDataRaw);
  modalRef.value!.modalIsCreate = isCreate;
}

const commonStore = useCommon();
/* 批量删除，没提供接口，只能逐个删除 */
async function deleteInBatches() {
  if (!tableGenRef.value!.chosenItems.length)
    return ElMessage.error(`请选择要删除的数据！`); // 未选中数据
  const ids = tableGenRef.value!.chosenItems.map(({ id }) => id);
  const pageName = getPageName();
  const isGoods = pageName === 'goods';
  if (ids.some(id => id < (isGoods ? 200 : 10)))
    return ElMessage.error(`id小于${isGoods ? 200 : 10}的数据不允许删除`); // id不合法，请求免发
  const urls = ids.map(id => `/${pageName}/${id}`);
  const successCount = await commonStore.deleteInBatchesAction(urls);
  if (!successCount) ElMessage.error(`批量删除失败`);
  else ElMessage.success(`成功批量删除${successCount}条数据`);
  getNewPageData(tableGenRef.value!.pagination);
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
          @itemViewClick="itemData => emits('viewItemData', itemData)"
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
            <el-popconfirm
              width="220"
              confirm-button-text="确定"
              cancel-button-text="取消"
              :icon="InfoFilled"
              icon-color="#626AEF"
              title="确定要删除此项吗？"
              @confirm="deleteInBatches"
            >
              <template #reference>
                <el-button type="danger" v-has="IPermissionType['delete']"
                  >批量删除</el-button
                >
              </template>
            </el-popconfirm>
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
