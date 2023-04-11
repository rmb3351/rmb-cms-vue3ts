import rmbRequest from '@/service';
import type { IDataType } from '../type';
import type { IStoryParams, IStoryContent, IStoryListResult } from './type';

enum storyAPI {
  StoryList = '/story/list',
  CreateStory = '/story'
}

export function storyListRequest(data: IStoryParams) {
  // post可以传泛型定义返回数据类型，IDataType又可以传泛型定义返回的data类型
  return rmbRequest.post<IDataType<IStoryListResult>>({
    url: storyAPI.StoryList,
    data
  });
}

export function createStoryRequest(data: IStoryContent) {
  return rmbRequest.post<IDataType<string>>({
    url: storyAPI.CreateStory,
    data
  });
}
