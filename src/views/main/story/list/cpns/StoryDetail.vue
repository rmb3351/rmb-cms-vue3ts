<script lang="ts" setup>
import { ref } from 'vue';
const props = withDefaults(
  defineProps<{
    title: string;
    content: string;
  }>(),
  {
    title: '<b>默认</b>标题',
    content: '<b>默认</b>内容'
  }
);
const dialogVisible = ref(false);
</script>

<template>
  <div class="StoryDetail__wrapper">
    <el-dialog
      v-model="dialogVisible"
      :title="title"
      width="60%"
      draggable
      align-center
      center
      destroy-on-close
    >
      <div v-html="content"></div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped></style>
