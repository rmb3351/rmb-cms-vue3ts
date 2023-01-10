import type { IPropItem } from './type';
const commonCol: IPropItem[] = [
  {
    prop: 'createAt',
    'min-width': '100',
    label: '创建时间'
  },
  {
    prop: 'updateAt',
    'min-width': '100',
    label: '更新时间'
  },
  {
    prop: 'actions',
    label: '操作',
    'min-width': '90'
  }
];
export default commonCol;
