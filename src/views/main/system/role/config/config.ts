import type { IFormConfig } from '@/components/form-generator/type';
import type { ITableConfig } from '@/components/table-generator/type';

/* FormGenerator的配置项 */
const roleFormConfig: IFormConfig = {
  formItems: [
    {
      type: 'input',
      label: '角色名',
      placeholder: '请输入角色名',
      field: 'name'
    },
    {
      type: 'input',
      label: '权限',
      placeholder: '请输入权限',
      field: 'intro'
    },
    {
      type: 'datepicker',
      label: '时间范围',
      field: 'times',
      otherOptions: {
        startPlaceholder: '创建时间',
        endPlaceholder: '更新时间',
        type: 'daterange'
      }
    }
  ],
  formDataRaws: {}
};

/* 从FormGenerator的配置项中抽取字段名生成对象 */
const formDataRaws: any = {};
roleFormConfig.formItems?.forEach(item => {
  formDataRaws[item.field] = item.type === 'datepicker' ? ['', ''] : '';
});
roleFormConfig.formDataRaws = formDataRaws;

/* TableGenerator的配置项 */
const roleTableConfig: ITableConfig = {
  propList: [
    {
      prop: 'name',
      'min-width': '100',
      label: '用户名'
    },
    {
      prop: 'intro',
      'min-width': '100',
      label: '权限'
    },
    {
      prop: 'createAt',
      'min-width': '100',
      label: '创建时间',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      'min-width': '100',
      label: '更新时间',
      slotName: 'updateAt'
    },
    {
      prop: 'actions',
      label: '操作',
      'min-width': '90',
      slotName: 'actions'
    }
  ],
  isShowSelection: true,
  isShowIndex: true,
  tableTitle: '角色列表'
};

export { roleFormConfig, formDataRaws, roleTableConfig };
