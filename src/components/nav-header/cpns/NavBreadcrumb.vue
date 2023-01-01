<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import useLogin from '@/store/login/login';
import { getCurrentMenuBreadcrumbs } from '@/utils/mapMenus';
/* 修改路由时动态获取当前面包屑导航的内容 */
const breadcrumbs = computed(() => {
  const route = useRoute();
  const loginStore = useLogin();
  return getCurrentMenuBreadcrumbs(route.fullPath, loginStore.userMenus);
});
</script>

<template>
  <div class="NavBreadcrumb__wrapper">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="breadcrumbItem in breadcrumbs"
        :key="breadcrumbItem.name"
        >{{ breadcrumbItem.name }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<style lang="less" scoped></style>
