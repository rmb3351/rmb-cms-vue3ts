<script setup lang="ts">
import { PropType, ref, watch } from 'vue';
import type { IFormItem, IColLayout } from '../type';
const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
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

const emits = defineEmits(['update:modelValue']);

/* 双向绑定数据管理 */
const formData = ref({ ...props.modelValue });
watch(formData, newVal => emits('update:modelValue', newVal), { deep: true });
</script>

<template>
  <el-form :label-width="labelWidth" class="form__wrapper">
    <div class="form__header">
      <slot name="form-header">
        <h2>高级检索</h2>
      </slot>
    </div>
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
                v-model="formData[item.field]"
              ></el-input>
            </template>
            <!-- 下拉选项框 -->
            <template v-else-if="item.type === 'select'">
              <el-select
                :placeholder="item.placeholder"
                v-bind="item.otherOptions"
                style="width: 100%"
                v-model="formData[item.field]"
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
                v-model="formData[item.field]"
              ></el-date-picker>
            </template>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
    <div class="form__footer">
      <slot name="form-footer">
        <el-button>
          <el-icon><RefreshRight /></el-icon>
          重置</el-button
        >
        <el-button type="primary">
          <el-icon><Search /></el-icon>
          搜索</el-button
        >
      </slot>
    </div>
  </el-form>
</template>

<style lang="less" scoped>
.form__wrapper {
  padding-top: 22px;
  .form__header {
    margin-bottom: 20px;
  }
  .form__footer {
    text-align: right;
    padding-right: 40px;
    padding-bottom: 20px;
  }
  .form__header .el-icon,
  .form__footer .el-icon {
    margin-right: 10px;
  }
}
</style>
