import type { IFormConfig } from '@/components/form-generator/type';
import type { ITableConfig } from '@/components/table-generator/type';
import { configAutoComplete } from '@/utils/configAutoComplete';

/* FormGenerator的配置项 */
const formConfig: IFormConfig = {
  formItems: [
    {
      type: 'input',
      label: '商品名',
      placeholder: '请输入商品名',
      field: 'name'
    },
    {
      type: 'select',
      label: '状态',
      placeholder: '请选择状态',
      field: 'status',
      options: [
        { label: '在售', value: 1 },
        { label: '售罄', value: 0 }
      ]
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
      label: '商品名称'
    },
    {
      prop: 'oldPrice',
      'min-width': '50',
      label: '原价'
    },
    {
      prop: 'newPrice',
      'min-width': '50',
      label: '现价'
    },
    {
      prop: 'imgUrl',
      'min-width': '60',
      label: '商品图片',
      slotName: 'imgUrl'
    },
    {
      prop: 'desc',
      'min-width': '100',
      label: '商品描述'
    },
    {
      prop: 'status',
      'min-width': '50',
      label: '商品状态',
      slotName: 'status'
    }
  ],
  isShowSelection: true,
  isShowIndex: true,
  tableTitle: '商品',
  showCommonCol: true
};

const listPageConfig = configAutoComplete(formConfig, tableConfig);

export { listPageConfig };
