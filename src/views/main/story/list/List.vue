<!-- 故事列表页面 -->
<script setup lang="ts">
import ListPageGenerator from '@/components/list-page-generator';
import useStory from '@/store/story/story';
import { ref } from 'vue';
import { listPageConfig } from './config/config';
import type { AnyObject } from '@/global/type';
import StoryDetail from './cpns/StoryDetail.vue';
const storyStore = useStory();
const dialogVisible = ref(false);
const storyDetail = ref({ title: '', content: '' });
function viewStory(storyItem: AnyObject) {
  dialogVisible.value = true;
  const { title, content } = storyItem;
  storyDetail.value = { title, content };
}
</script>

<template>
  <div class="List__wrapper">
    <StoryDetail v-model="dialogVisible" v-bind="storyDetail"></StoryDetail>
    <ListPageGenerator
      :listPageConfig="listPageConfig"
      :getDataFn="storyStore.storyListAction"
      :dataSource="storyStore.storyLists"
      :totalCount="storyStore.storyCount"
      @viewItemData="viewStory"
    >
      <template #title="scope">
        <div v-html="scope.row.title"></div>
      </template>
      <template #content="scope">
        <div v-html="scope.row.content"></div>
      </template>
    </ListPageGenerator>
  </div>
</template>

<style lang="less" scoped></style>
