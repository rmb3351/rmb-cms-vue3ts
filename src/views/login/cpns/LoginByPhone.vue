<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormInstance } from 'element-plus';
import { rules } from '../config/phone-config';

const phoneFormRef = ref<FormInstance>();

const phoneForm = reactive({
  phone: '',
  code: ''
});

function getCode() {
  console.log('验证码来咯');
}

function loginAction() {
  phoneFormRef.value?.validate(pass => {
    if (pass) {
      console.log('校验成功', phoneForm);
    }
  });
}

defineExpose({ loginAction });
</script>

<template>
  <div class="LoginByPhone__wrapper">
    <el-form
      ref="phoneFormRef"
      :model="phoneForm"
      status-icon
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="phoneForm.phone" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="phoneForm.code" />
        <el-button @click="getCode">获取验证码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
:deep(.el-form-item__content) {
  display: flex;
  flex-wrap: nowrap;
  .el-input {
    margin-right: 10px;
  }
}
</style>
