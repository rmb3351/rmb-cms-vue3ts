<!-- 用户管理页面 -->
<script setup lang="ts">
import { ref } from 'vue';
import FormGenerator from '@/components/form-generator';
import type { IFormConfig } from '@/components/form-generator/type';
import useSystem from '@/store/system/system';
const userFormConfig: IFormConfig = {
  formItems: [
    {
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名',
      field: 'userName'
    },
    {
      type: 'password',
      label: '密码',
      placeholder: '请输入密码',
      field: 'password'
    },
    {
      type: 'select',
      label: '爱好',
      placeholder: '请选择爱好',
      field: 'hobby',
      options: [
        {
          value: 'sing',
          label: '唱'
        },
        {
          value: 'dance',
          label: '跳'
        },
        {
          value: 'rap',
          label: 'Rap'
        },
        {
          value: 'basketball',
          label: '篮球'
        }
      ]
    },
    {
      type: 'datepicker',
      label: '表演时间',
      field: 'times',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
};

/* 管理v-model的数据 */
const formDataFields: any = {};
userFormConfig.formItems?.forEach(item => {
  formDataFields[item.field] = item.type === 'datepicker' ? ['', ''] : '';
});
const userFormData = ref(formDataFields);

/* 获取用户数据 */
const systemStore = useSystem();
systemStore.userManagementAction({ offset: 0, size: 10 });
</script>

<template>
  <div class="User__wrapper">
    <FormGenerator v-bind="userFormConfig" v-model="userFormData">
    </FormGenerator>
  </div>
</template>

<style lang="less" scoped></style>
