<!-- 用户管理页面 -->
<script setup lang="ts">
import FormGenerator from '@/components/form-generator';
import type { IFormConfig } from '@/components/form-generator/type';
const userFormConfig: IFormConfig = {
  formItems: [
    {
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      type: 'password',
      label: '密码',
      placeholder: '请输入密码'
    },
    {
      type: 'select',
      label: '爱好',
      placeholder: '请选择爱好',
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
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
};
</script>

<template>
  <div class="User__wrapper">
    <FormGenerator v-bind="userFormConfig"></FormGenerator>
  </div>
</template>

<style lang="less" scoped></style>
