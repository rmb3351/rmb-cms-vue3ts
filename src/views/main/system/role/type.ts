/* 根据elementplus文档建立的el-tree相关类型 */
import type { IMenus } from '@/service/request/login/type';
export type TreeKey = number | string;

export interface ITreeNode {
  [key: string]: any;
}

export interface ICheckedStatusObj {
  checkedKeys: TreeKey[];
  halfCheckedKeys: TreeKey[];
  checkedNodes: ITreeNode[];
  halfCheckedNodes: ITreeNode[];
}

export interface IRoleExtraInfo {
  menuList?: TreeKey[];
  [key: string]: any;
}
export interface IRoleInfo {
  menuList: IMenus[];
  [key: string]: any;
}
