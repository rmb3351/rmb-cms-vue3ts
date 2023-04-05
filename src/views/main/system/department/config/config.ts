import type { IFormConfig } from '@/components/form-generator/type';
import type { ITableConfig } from '@/components/table-generator/type';
import { configAutoComplete } from '@/utils/configAutoComplete';

/* FormGenerator的配置项 */
const formConfig: IFormConfig = {
  formItems: [
    {
      type: 'input',
      label: '部门名称',
      placeholder: '请输入部门名称',
      field: 'name'
    },
    {
      type: 'input',
      label: '部门领导',
      placeholder: '请输入部门领导',
      field: 'leader'
    },
    {
      type: 'select',
      label: '上级部门',
      field: 'parentId',
      placeholder: '请选择上级部门'
    }
  ],
  // 由于是必传属性，先放个空对象占位
  formDataRaws: {}
};

/* TableGenerator的配置项 */
const tableConfig: ITableConfig = {
  propList: [
    {
      prop: 'name',
      'min-width': '100',
      label: '部门名称'
    },
    {
      prop: 'leader',
      'min-width': '100',
      label: '部门领导'
    },
    {
      prop: 'parentId',
      'min-width': '100',
      label: '上级部门',
      slotName: 'parentId'
    }
  ],
  tableTitle: '部门',
  isShowIndex: true,
  isShowSelection: true,
  showCommonCol: true
};

const listPageConfig = configAutoComplete(formConfig, tableConfig);

// 初始值对象也单独导出，给具体的FormGenerator父组件使用
export { listPageConfig };
