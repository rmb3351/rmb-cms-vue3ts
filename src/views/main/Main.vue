<script setup lang="ts">
import NavMenu from '@/components/nav-menu';
</script>

<template>
  <el-container class="Main__wrapper">
    <el-aside class="menus__wrapper">
      <NavMenu></NavMenu>
    </el-aside>
    <el-container>
      <el-header class="main__header">Header</el-header>
      <el-main class="main__content">Main</el-main>
    </el-container>
  </el-container>
</template>

<style lang="less" scoped>
.Main__wrapper {
  height: 100%;
}
.menus__wrapper {
  width: 220px;
  height: 100%;
  background-color: #122c3d;
}
.main__header {
  background-color: #eee;
}
.main__content {
  text-align: center;
  background-color: #dbdbdd;
}
</style>
