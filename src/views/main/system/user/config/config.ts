import type { IFormConfig } from '@/components/form-generator/type';
import type { ITableConfig } from '@/components/table-generator/type';
import { configAutoComplete } from '@/utils/configAutoComplete';

/* FormGenerator的配置项 */
const formConfig: IFormConfig = {
  formItems: [
    {
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名',
      field: 'name'
    },
    {
      type: 'input',
      label: '真名',
      placeholder: '请输入真名',
      field: 'realname'
    },
    {
      type: 'input',
      label: '手机号',
      placeholder: '请输入手机号',
      field: 'cellphone'
    },
    {
      type: 'select',
      label: '部门',
      placeholder: '请选择用户部门',
      field: 'departmentId',
      options: []
    },
    {
      type: 'select',
      label: '角色',
      placeholder: '请选择用户角色',
      field: 'roleId',
      options: []
    },
    {
      type: 'select',
      label: '用户状态',
      placeholder: '请选择用户状态',
      field: 'enable',
      options: [
        {
          value: 1,
          label: '在用'
        },
        {
          value: 0,
          label: '弃用'
        }
      ]
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
  // 由于是必传属性，先放个空对象占位
  formDataRaws: {}
};

/* TableGenerator的配置项 */
const tableConfig: ITableConfig = {
  propList: [
    {
      prop: 'name',
      'min-width': '60',
      label: '用户名'
    },
    {
      prop: 'realname',
      'min-width': '60',
      label: '真名'
    },
    {
      prop: 'cellphone',
      'min-width': '100',
      label: '手机号'
    },
    {
      prop: 'departmentId',
      'min-width': '60',
      label: '部门',
      slotName: 'department'
    },
    {
      prop: 'roleId',
      'min-width': '60',
      label: '角色',
      slotName: 'role'
    },
    {
      prop: 'enable',
      'min-width': '60',
      label: '用户状态',
      slotName: 'status'
    }
  ],
  isShowSelection: true,
  isShowIndex: true,
  tableTitle: '用户',
  showCommonCol: true
};

const listPageConfig = configAutoComplete(formConfig, tableConfig);

// 初始值对象也单独导出，给具体的FormGenerator父组件使用
export { listPageConfig };
