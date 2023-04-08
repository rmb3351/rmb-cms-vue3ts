import type { IFormConfig } from '@/components/form-generator/type';
import type { ITableConfig } from '@/components/table-generator/type';
import { configAutoComplete } from '@/utils/configAutoComplete';

/* FormGenerator的配置项 */
const formConfig: IFormConfig = {
  formItems: [
    {
      type: 'input',
      label: '类别名',
      placeholder: '请输入类别名',
      field: 'name'
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
      label: '类别名称'
    }
  ],
  isShowSelection: true,
  isShowIndex: true,
  tableTitle: '类别',
  showCommonCol: true
};

const listPageConfig = configAutoComplete(formConfig, tableConfig);

export { listPageConfig };
