<script setup lang="ts">
import { PropType } from 'vue';
import type { IFormItem, IColLayout } from '../type';
defineProps({
  formItems: {
    type: Array as PropType<IFormItem[]>,
    default: () => []
  },
  labelWidth: {
    type: String,
    default: '100px'
  },
  itemStyle: {
    type: Object,
    default: () => ({
      padding: '10px 40px'
    })
  },
  colLayout: {
    type: Object as PropType<IColLayout>,
    default: () => ({
      xs: 24,
      sm: 24,
      md: 12,
      lg: 8,
      xl: 6
    })
  }
});
</script>

<template>
  <el-form :label-width="labelWidth" class="form__wrapper">
    <el-row>
      <template v-for="item in formItems" :key="item.label">
        <el-col v-bind="colLayout">
          <el-form-item
            :label="item.label"
            :rules="item.rules"
            :style="itemStyle"
          >
            <!-- 一般输入框或密码输入框 -->
            <template v-if="item.type === 'input' || item.type === 'password'">
              <el-input
                v-bind="item.otherOptions"
                :show-password="item.type === 'password'"
                :placeholder="item.placeholder"
              ></el-input>
            </template>
            <!-- 下拉选项框 -->
            <template v-else-if="item.type === 'select'">
              <el-select
                :placeholder="item.placeholder"
                v-bind="item.otherOptions"
                style="width: 100%"
              >
                <el-option
                  v-for="opt in item.options"
                  :key="opt.value"
                  :value="opt.value"
                  >{{ opt.label }}</el-option
                >
              </el-select>
            </template>
            <!-- 时间选择器 -->
            <template v-else-if="item.type === 'datepicker'">
              <el-date-picker
                v-bind="item.otherOptions"
                style="width: 100%"
              ></el-date-picker>
            </template>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<style lang="less" scoped>
.form__wrapper {
  padding-top: 22px;
}
</style>
