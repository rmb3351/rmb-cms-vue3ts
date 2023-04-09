<script setup lang="ts">
import commonCol from '../commonColConfig';
import { IPermissionType } from '@/hooks/usePermission';
import { getPageName } from '@/utils/mapPageName';
import useCommon from '@/store/common/common';

const commonStore = useCommon();
const emits = defineEmits(['searchAfterDelete', 'editItem']);

/**
 * @param item 行数据scope.row
 * @description 自动获取当前页面和行数据id删除对应item，并处理成功和失败的结果
 */
async function deleteItem(item: any) {
  const { code, data } = await commonStore.deleteItemByIdAction(
    `/${getPageName()}/${item.id}`
  );
  if (typeof code !== 'number' || code < 0) {
    ElMessage.error(data || '删除失败！' + code);
    return;
  } else {
    ElMessage.success('删除成功！');
    emits('searchAfterDelete');
  }
}

/* 传递数据：从TableCommonCol=》TableGenerator=》ListPageGenerator=》具体sfc */
function editItem(item: any) {
  emits('editItem', item);
}
</script>

<template>
  <el-table-column
    v-for="propItem in commonCol"
    :key="propItem.prop"
    v-bind="propItem"
    :align="propItem.align ?? 'center'"
  >
    <template #default="scope">
      <template v-if="propItem.prop === 'actions'">
        <el-button
          type="primary"
          v-has="IPermissionType['update']"
          @click="editItem(scope.row)"
        >
          <el-icon>
            <Edit />
          </el-icon>
          编辑</el-button
        >
        <el-button
          type="danger"
          v-has="IPermissionType['delete']"
          @click="deleteItem(scope.row)"
        >
          <el-icon>
            <Delete />
          </el-icon>
          删除</el-button
        >
      </template>
      <template v-else>
        <span>{{ $formatter.formatUtcString(scope.row[propItem.prop]) }}</span>
      </template>
    </template>
  </el-table-column>
</template>

<style lang="less" scoped></style>
