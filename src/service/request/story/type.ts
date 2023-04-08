import type { IListParams, IListsResult } from '../type';

export interface IStoryParams extends IListParams {
  title?: string;
  content?: string;
}

export interface IStoryListResult extends IListsResult {
  list: IStroyListItem[];
}

export interface IStroyListItem {
  id: number;
  title: string;
  content: string;
  createAt: string;
}
