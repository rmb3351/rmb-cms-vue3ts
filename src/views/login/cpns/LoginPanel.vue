<script setup lang="ts">
import LoginByAccount from './LoginByAccount.vue';
import LoginByPhone from './LoginByPhone.vue';
import { ref } from 'vue';
const isRemember = ref(true);
// 为组件加上泛型，好让ts参与校验和提示
const accountRef = ref<InstanceType<typeof LoginByAccount>>();
const phoneRef = ref<InstanceType<typeof LoginByPhone>>();

function handleLoginBtnClick() {
  if (tabChosen.value === 'account') accountRef.value?.loginAction();
  else phoneRef.value?.loginAction();
}
const tabChosen = ref('account');
</script>

<template>
  <div class="LoginPanel__wrapper">
    <h1>后台管理系统</h1>
    <el-tabs
      type="border-card"
      class="login-tabs__wrapper"
      stretch
      v-model="tabChosen"
    >
      <el-tab-pane name="account">
        <template #label>
          <div class="tab-label__wrapper">
            <el-icon><UserFilled /></el-icon>
            <span>账号登录</span>
          </div>
        </template>
        <LoginByAccount ref="accountRef"></LoginByAccount>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <div class="tab-label__wrapper">
            <el-icon><Iphone /></el-icon>
            <span>手机登录</span>
          </div>
        </template>
        <LoginByPhone ref="phoneRef"></LoginByPhone>
      </el-tab-pane>
    </el-tabs>
    <div class="login-choices__wrapper">
      <el-checkbox v-model="isRemember" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login__btn" @click="handleLoginBtnClick"
      >登录</el-button
    >
  </div>
</template>

<style lang="less" scoped>
.login-tabs__wrapper {
  margin-top: 20px;
  .tab-label__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    .el-icon {
      margin-right: 5px;
    }
  }
}

.login-choices__wrapper {
  display: flex;
  justify-content: space-between;
}

.login__btn {
  width: 100%;
}
</style>
