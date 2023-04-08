<!-- 商品类别页面 -->
<script setup lang="ts">
import ListPageGenerator from '@/components/list-page-generator';
import useProduct from '@/store/product/product';
import { listPageConfig } from './config/config';
const productStore = useProduct();
</script>

<template>
  <div class="Category__wrapper">
    <ListPageGenerator
      :listPageConfig="listPageConfig"
      :getDataFn="productStore.categoryInfoAction"
      :dataSource="productStore.categoryLists"
      :totalCount="productStore.cateCount"
    >
    </ListPageGenerator>
  </div>
</template>

<style lang="less" scoped></style>
