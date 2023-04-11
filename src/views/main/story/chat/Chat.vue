<!-- 你的故事页面 -->
<script setup lang="ts">
import { ref } from 'vue';
import useStory from '@/store/story/story';
import RichEditor from '@/components/rich-editor';

const titleHtmlStr = ref('<b>默认</b>标题');
const contentHtmlStr = ref('<b>默认</b>内容');
const titleEditorRef = ref<InstanceType<typeof RichEditor>>();
const contentEditorRef = ref<InstanceType<typeof RichEditor>>();
const storyStore = useStory();

async function publishStory() {
  /* 有效内容长度判断 */
  const validTitle = titleEditorRef.value!.content.text.replace(/&nbsp;/g, '');
  const validContent = contentEditorRef.value!.content.text.replace(
    /&nbsp;/g,
    ''
  );
  if (!validTitle.trim().length || !validContent.trim().length)
    return ElMessage.error('标题和内容缺一不可');
  /* 发请求，成功则重置内容 */
  const { code, data } = await storyStore.createStoryAction({
    title: titleHtmlStr.value,
    content: contentHtmlStr.value
  });
  if (code === 0) {
    ElMessage.success(data);
    titleHtmlStr.value = '<b>默认</b>标题';
    contentHtmlStr.value = '<b>默认</b>内容';
  } else ElMessage.error(data);
}
</script>

<template>
  <div class="Chat__wrapper">
    <h2 class="main-child">标题输入框</h2>
    <RichEditor
      v-model:value="titleHtmlStr"
      :height="40"
      class="main-child"
      ref="titleEditorRef"
    ></RichEditor>
    <h2 class="main-child">内容输入框</h2>
    <RichEditor
      v-model:value="contentHtmlStr"
      class="main-child"
      ref="contentEditorRef"
    ></RichEditor>
    <el-button @click="publishStory" type="primary">发表故事</el-button>
  </div>
</template>

<style lang="less" scoped>
.Chat__wrapper {
  text-align: left;
  margin-top: 30px;
  padding: 20px;
  .main-child {
    margin-bottom: 20px;
  }
}
</style>
