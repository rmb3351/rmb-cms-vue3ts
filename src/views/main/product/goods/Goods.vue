<!-- 商品信息页面 -->
<script setup lang="ts">
import { ref } from 'vue';
import FormGenerator from '@/components/form-generator';
import TableGenerator from '@/components/table-generator';
import useProduct from '@/store/product/product';
import useGetPageData from '@/hooks/useGetPageData';
import { goodFormConfig, formDataRaws, goodTableConfig } from './config/config';

const goodFormData = ref(formDataRaws);

const productStore = useProduct();
const { tableGenRef, getPageData, resetTable, searchTable, getNewPageData } =
  useGetPageData(productStore.goodsInfoAction);

getPageData();
</script>

<template>
  <div class="Goods__wrapper">
    <FormGenerator
      v-bind="goodFormConfig"
      v-model="goodFormData"
      @resetTable="resetTable"
      @searchTable="searchTable"
    >
    </FormGenerator>
    <div class="user__table">
      <TableGenerator
        ref="tableGenRef"
        :dataSource="productStore.goodLists"
        v-bind="goodTableConfig"
        :totalCount="productStore.goodCount"
        @paginationChange="getNewPageData"
      >
        <!-- 定制化插槽的使用 -->
        <template #status="scope">
          <span>{{ scope.row.status === 1 ? '在售' : '售罄' }}</span>
        </template>
        <template #imgUrl="scope">
          <el-image
            fit="scale-down"
            style="width: 100px; height: 100px"
            :src="scope.row.imgUrl"
            :zoom-rate="1.2"
            :preview-src-list="[scope.row.imgUrl]"
          ></el-image>
        </template>
        <!-- 以下是TableGenerator自带的插槽 -->
        <template #headerActions>
          <el-button type="primary">新增商品</el-button>
          <el-button type="danger">批量删除</el-button>
        </template>
      </TableGenerator>
    </div>
  </div>
</template>

<style lang="less" scoped>
.user__table {
  border-top: 2px solid #dbdbdd;
  padding: 20px;
  .el-icon {
    margin-right: 5px;
  }
}
</style>
