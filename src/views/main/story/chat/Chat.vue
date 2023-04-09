<!-- 你的故事页面 -->
<script setup lang="ts">
import { ref } from 'vue';
import RichEditor from '@/components/rich-editor';
const htmlStr = ref('<b>默认</b>内容');
</script>

<template>
  <div class="Chat__wrapper">
    <RichEditor v-model:value="htmlStr"></RichEditor>
  </div>
</template>

<style lang="less" scoped></style>
