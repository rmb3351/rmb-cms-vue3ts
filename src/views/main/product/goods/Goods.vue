<!-- 商品信息页面 -->
<script setup lang="ts">
import ListPageGenerator from '@/components/list-page-generator';
import useProduct from '@/store/product/product';
import { listPageConfig } from './config/config';

const productStore = useProduct();
</script>

<template>
  <div class="Goods__wrapper">
    <ListPageGenerator
      :listPageConfig="listPageConfig"
      :getDataFn="productStore.goodsInfoAction"
      :dataSource="productStore.goodLists"
      :totalCount="productStore.goodCount"
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
          hide-on-click-modal
          close-on-press-escape
          preview-teleported
        ></el-image>
      </template>
    </ListPageGenerator>
  </div>
</template>

<style lang="less" scoped></style>
