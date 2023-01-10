/* 参照element-plus文档加上自定义的属性即可 */
export interface IPropItem {
  prop: string;
  label: string;
  'min-width'?: string | number;
  width?: string | number;
  align?: string;
  slotName?: string;
}

export interface ITableConfig {
  propList: IPropItem[];
  isShowSelection?: boolean;
  isShowIndex?: boolean;
  tableTitle?: string;
  showCommonCol?: boolean;
}

export interface IPagination {
  currentPage: number;
  pageSize: number;
}
