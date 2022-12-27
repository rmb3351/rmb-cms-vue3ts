<script setup lang="ts">
import { ref } from 'vue';
import NavMenu from '@/components/nav-menu';
import NavHeader from '@/components/nav-header';
const isFold = ref(false);
function handleFoldChange(iconIsFold: boolean) {
  isFold.value = !iconIsFold;
}
</script>

<template>
  <el-container class="Main__wrapper">
    <el-aside class="menus__wrapper" :width="isFold ? '70px' : '220px'">
      <NavMenu :isFold="isFold"></NavMenu>
    </el-aside>
    <el-container>
      <el-header class="main__header">
        <NavHeader @is-fold-change="handleFoldChange"></NavHeader>
      </el-header>
      <el-main class="main__content">
        <!-- 这里的router-view要正常生效，首先要addRoute时添加了main作为父路由的名称，其次还要在router/index.ts内给main的route对象加上name属性 -->
        <router-view class="main__comp"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="less" scoped>
.Main__wrapper {
  height: 100%;
}
.menus__wrapper {
  height: 100%;
  background-color: #122c3d;
  // el-aside修改宽度不自带动画了，自己写个过渡
  transition: width 0.5s;
}
.main__header {
  background-color: #eee;
}
.main__content {
  text-align: center;
  background-color: #dbdbdd;
  .main__comp {
    background-color: #fff;
    border-radius: 5px;
  }
}
</style>
