import type { IFormConfig } from '@/components/form-generator/type';
import type { ITableConfig } from '@/components/table-generator/type';
import { configAutoComplete } from '@/utils/configAutoComplete';

/* FormGenerator的配置项 */
const formConfig: IFormConfig = {
  formItems: [
    {
      type: 'input',
      label: '标题名',
      placeholder: '请输入类别名',
      field: 'title'
    },
    {
      type: 'input',
      label: '内容',
      placeholder: '请输入类别名',
      field: 'content'
    }
  ],
  formDataRaws: {}
};

/* TableGenerator的配置项 */
const tableConfig: ITableConfig = {
  propList: [
    {
      prop: 'title',
      'min-width': '100',
      label: '标题名'
    },
    {
      prop: 'content',
      'min-width': '100',
      label: '内容'
    }
  ],
  isShowSelection: true,
  isShowIndex: true,
  tableTitle: '故事',
  showCommonCol: true
};

const listPageConfig = configAutoComplete(formConfig, tableConfig);

export { listPageConfig };
