<script setup lang="ts">
// element配置国际化-中文
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
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
