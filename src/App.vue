<script setup lang="ts">
// element配置国际化-中文
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
</script>

<template>
  <div class="App__wrapper">
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<style lang="less" scoped>
.App__wrapper {
  width: 100%;
  height: 100%;
}
</style>
