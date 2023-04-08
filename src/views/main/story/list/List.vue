<!-- 故事列表页面 -->
<script setup lang="ts">
import ListPageGenerator from '@/components/list-page-generator';
import useStory from '@/store/story/story';
import { listPageConfig } from './config/config';
const storyStore = useStory();
</script>

<template>
  <div class="List__wrapper">
    <ListPageGenerator
      :listPageConfig="listPageConfig"
      :getDataFn="storyStore.storyListAction"
      :dataSource="storyStore.storyLists"
      :totalCount="storyStore.storyCount"
    >
    </ListPageGenerator>
  </div>
</template>

<style lang="less" scoped></style>
