<script setup lang="ts">
import LoginPanel from './cpns/LoginPanel.vue';
</script>

<template>
  <div class="Login__wrapper">
    <div class="login__content">
      <LoginPanel></LoginPanel>
    </div>
  </div>
</template>

<style lang="less" scoped>
.Login__wrapper {
  width: 100%;
  height: 100%;
  background: url(~../../assets/img/login-bg.svg);
  box-sizing: border-box;
  border: 1px solid transparent;
}
.login__content {
  width: 400px;
  margin: 33vh auto;
  text-align: center;
}
</style>
