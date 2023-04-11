import { defineStore } from 'pinia';
import {
  storyListRequest,
  createStoryRequest
} from '@/service/request/story/story';
import type {
  IStoryParams,
  IStoryContent,
  IStroyListItem
} from '@/service/request/story/type';
const useStory = defineStore('story', {
  state: () => ({
    storyLists: [] as IStroyListItem[],
    storyCount: 0
  }),
  actions: {
    async storyListAction(storyParams: IStoryParams) {
      const {
        data: { list, totalCount }
      } = await storyListRequest(storyParams);
      this.storyLists = list;
      this.storyCount = totalCount;
    },
    async createStoryAction(storyContent: IStoryContent) {
      // 直接将请求的promise返回，方便页面内处理
      return createStoryRequest(storyContent);
    }
  }
});

export default useStory;
