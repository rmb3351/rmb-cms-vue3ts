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
  childrenProps?: IChildrenProps;
  showFooter?: boolean;
}

export interface IPagination {
  currentPage: number;
  pageSize: number;
}

/* 树形表格展开需要的属性 */
export interface IChildrenProps {
  rowKey: string | ((row: any) => string);
  treeProps?: ITreeProp;
}

interface ITreeProp {
  children: string;
  hasChildren?: string;
}
