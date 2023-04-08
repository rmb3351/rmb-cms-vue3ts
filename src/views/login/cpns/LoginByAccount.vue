<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormInstance } from 'element-plus';
import { rules } from '../config/accout-config';
import loCache from '@/utils/loCache';
import useLogin from '@/store/login/login';

const accountFormRef = ref<FormInstance>();
const accountStr = 'account';
const passwordStr = 'password';

const accountForm = reactive({
  account: loCache.get(accountStr) ?? '',
  password: loCache.get(passwordStr) ?? ''
});

const loginStore = useLogin();

function loginAction(isRemember: boolean) {
  accountFormRef.value?.validate(pass => {
    if (pass) {
      /* 缓存或清除缓存 */
      if (isRemember) {
        loCache.set(accountStr, accountForm.account);
        loCache.set(passwordStr, accountForm.password);
      } else {
        loCache.remove(accountStr);
        loCache.remove(passwordStr);
      }
      const loginParam = {
        name: accountForm.account,
        password: accountForm.password
      };
      loginStore.accountLoginAction(loginParam);
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
      <el-form-item label="账号" :prop="accountStr">
        <el-input v-model="accountForm.account" />
      </el-form-item>
      <el-form-item label="密码" :prop="passwordStr">
        <el-input
          v-model="accountForm.password"
          show-password
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped></style>
