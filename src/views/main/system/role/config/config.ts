import type { IFormConfig } from '@/components/form-generator/type';
import type { ITableConfig } from '@/components/table-generator/type';
import { configAutoComplete } from '@/utils/configAutoComplete';

/* FormGenerator的配置项 */
const formConfig: IFormConfig = {
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

/* TableGenerator的配置项 */
const tableConfig: ITableConfig = {
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
    }
  ],
  isShowSelection: true,
  isShowIndex: true,
  tableTitle: '角色',
  showCommonCol: true
};

const listPageConfig = configAutoComplete(formConfig, tableConfig);

export { listPageConfig };
