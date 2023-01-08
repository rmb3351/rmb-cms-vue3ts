import type { IFormConfig } from '@/components/form-generator/type';
import type { ITableConfig } from '@/components/table-generator/type';

/* FormGenerator的配置项 */
const userFormConfig: IFormConfig = {
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

/* 从FormGenerator的配置项中抽取字段名生成对象 */
const formDataRaws: any = {};
userFormConfig.formItems?.forEach(item => {
  formDataRaws[item.field] = item.type === 'datepicker' ? ['', ''] : '';
});
// 初始值对象放入formConfig替换空对象（因为必传），FormGenerator重置时用得上
userFormConfig.formDataRaws = formDataRaws;

/* TableGenerator的配置项 */
const userTableConfig: ITableConfig = {
  propList: [
    {
      prop: 'name',
      'min-width': '100',
      label: '用户名'
    },
    {
      prop: 'realname',
      'min-width': '100',
      label: '真名'
    },
    {
      prop: 'cellphone',
      'min-width': '100',
      label: '手机号'
    },
    {
      prop: 'enable',
      'min-width': '100',
      label: '用户状态',
      slotName: 'status'
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
  tableTitle: '用户列表'
};

// 初始值对象也单独导出，给具体的FormGenerator父组件使用
export { userFormConfig, formDataRaws, userTableConfig };
