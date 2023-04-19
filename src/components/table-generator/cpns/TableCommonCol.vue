<script setup lang="ts">
import { InfoFilled } from '@element-plus/icons-vue';
import commonCol from '../commonColConfig';
import { IPermissionType } from '@/hooks/usePermission';
import { getPageName } from '@/utils/mapPageName';
import useCommon from '@/store/common/common';
import type { AnyObject } from '@/global/type';

const commonStore = useCommon();
const emits = defineEmits<{
  (e: 'searchAfterDelete'): void;
  (e: 'editItem', item: AnyObject): void;
  (e: 'viewItem', item: AnyObject): void;
}>();

/**
 * @param item 行数据scope.row
 * @description 自动获取当前页面和行数据id删除对应item，并处理成功和失败的结果
 */
async function deleteItem(item: AnyObject) {
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
function editItem(item: AnyObject) {
  emits('editItem', item);
}

/* 传递数据同上 */
function viewItem(item: AnyObject) {
  emits('viewItem', item);
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
          type="info"
          v-has="IPermissionType['detail']"
          @click="viewItem(scope.row)"
        >
          <el-icon><View /></el-icon>
          查看详情</el-button
        >
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
        <el-popconfirm
          width="220"
          confirm-button-text="确定"
          cancel-button-text="取消"
          :icon="InfoFilled"
          icon-color="#626AEF"
          title="确定要删除此项吗？"
          @confirm="deleteItem(scope.row)"
        >
          <template #reference>
            <el-button type="danger" v-has="IPermissionType['delete']">
              <el-icon>
                <Delete />
              </el-icon>
              删除</el-button
            >
          </template>
        </el-popconfirm>
      </template>
      <template v-else>
        <span>{{ $formatter.formatUtcString(scope.row[propItem.prop]) }}</span>
      </template>
    </template>
  </el-table-column>
</template>

<style lang="less" scoped></style>
