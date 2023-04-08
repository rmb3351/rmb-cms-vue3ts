import rmbRequest from '@/service';
import type { IDataType } from '../type';
import type { IStoryParams, IStoryListResult } from './type';

enum storyAPI {
  StoryList = '/story/list'
}

export function storyListRequest(data: IStoryParams) {
  // post可以传泛型定义返回数据类型，IDataType又可以传泛型定义返回的data类型
  return rmbRequest.post<IDataType<IStoryListResult>>({
    url: storyAPI.StoryList,
    data
  });
}
