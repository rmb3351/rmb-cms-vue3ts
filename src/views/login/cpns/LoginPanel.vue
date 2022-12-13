<script setup lang="ts">
import LoginByAccount from './LoginByAccount.vue';
import LoginByPhone from './LoginByPhone.vue';
</script>

<template>
  <div class="LoginPanel__wrapper">
    <h1>后台管理系统</h1>
    <el-tabs type="border-card" class="login-tabs__wrapper" stretch>
      <el-tab-pane>
        <template #label>
          <div class="tab-label__wrapper">
            <el-icon><UserFilled /></el-icon>
            <span>账号登录</span>
          </div>
        </template>
        <LoginByAccount></LoginByAccount>
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <div class="tab-label__wrapper">
            <el-icon><Iphone /></el-icon>
            <span>手机登录</span>
          </div>
        </template>
        <LoginByPhone></LoginByPhone>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="less" scoped>
.login-tabs__wrapper {
  margin-top: 20px;
}
.tab-label__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  .el-icon {
    margin-right: 5px;
  }
}
</style>
