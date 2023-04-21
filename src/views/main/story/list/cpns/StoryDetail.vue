<script lang="ts" setup>
import { computed } from 'vue';
const props = defineProps<{
  title: string;
  content: string;
  modelValue: boolean;
}>();
const emits = defineEmits<{
  (e: 'update:modelValue', visible: boolean): void;
}>();
/* 创建一个计算属性对modelValue代理，使它和dialog双向绑定 */
const dialogVisible = computed({
  set(newVal) {
    emits('update:modelValue', newVal);
  },
  get: () => props.modelValue
});
</script>

<template>
  <div class="StoryDetail__wrapper">
    <el-dialog
      v-model="dialogVisible"
      width="60%"
      draggable
      align-center
      center
      destroy-on-close
    >
      <template #header>
        <div v-html="title"></div>
      </template>
      <div v-html="content"></div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="emits('update:modelValue', false)">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped></style>
