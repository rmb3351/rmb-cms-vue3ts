<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormInstance } from 'element-plus';

const ruleFormRef = ref<FormInstance>();

const checkAccount = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入账号'));
  }
  if (!/^[a-zA-Z0-9]{6,10}$/.test(value)) {
    callback(new Error('请输入6~10位英文或数字'));
  } else {
    callback();
  }
};

const validatePass = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入密码'));
  }
  if (!/^[a-zA-Z0-9]{6,16}$/.test(value)) {
    callback(new Error('请输入6~16位英文或数字'));
  } else {
    callback();
  }
};

const ruleForm = reactive({
  account: '',
  password: ''
});

const rules = reactive({
  account: [{ validator: checkAccount, trigger: 'blur', required: true }],
  password: [{ validator: validatePass, trigger: 'blur', required: true }]
});
</script>

<template>
  <div class="LoginByAccount__wrapper">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="account">
        <el-input v-model="ruleForm.account" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped></style>
