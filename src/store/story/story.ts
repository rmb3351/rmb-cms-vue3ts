import { defineStore } from 'pinia';
import { storyListRequest } from '@/service/request/story/story';
import type {
  IStoryParams,
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
    }
  }
});

export default useStory;
