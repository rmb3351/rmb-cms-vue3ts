<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormInstance } from 'element-plus';
import { rules } from '../config/accout-config';

const accountFormRef = ref<FormInstance>();

const accountForm = reactive({
  account: '',
  password: ''
});

function loginAction() {
  accountFormRef.value?.validate(pass => {
    if (pass) {
      console.log('校验成功', accountForm);
    }
  });
}

defineExpose({ loginAction });
</script>

<template>
  <div class="LoginByAccount__wrapper">
    <el-form
      ref="accountFormRef"
      :model="accountForm"
      status-icon
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="账号" prop="account">
        <el-input v-model="accountForm.account" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="accountForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped></style>
