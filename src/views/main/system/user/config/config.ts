import type { IFormConfig } from '@/components/form-generator/type';
import type { IPropItem } from '@/components/table-generator/type';

/* FormGenerator的配置项 */
const userFormConfig: IFormConfig = {
  formItems: [
    {
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名',
      field: 'userName'
    },
    {
      type: 'password',
      label: '密码',
      placeholder: '请输入密码',
      field: 'password'
    },
    {
      type: 'select',
      label: '爱好',
      placeholder: '请选择爱好',
      field: 'hobby',
      options: [
        {
          value: 'sing',
          label: '唱'
        },
        {
          value: 'dance',
          label: '跳'
        },
        {
          value: 'rap',
          label: 'Rap'
        },
        {
          value: 'basketball',
          label: '篮球'
        }
      ]
    },
    {
      type: 'datepicker',
      label: '表演时间',
      field: 'times',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
};

/* 从FormGenerator的配置项中抽取字段名生成对象 */
const formDataFields: any = {};
userFormConfig.formItems?.forEach(item => {
  formDataFields[item.field] = item.type === 'datepicker' ? ['', ''] : '';
});

/* TableGenerator的配置项 */
const propList: IPropItem[] = [
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
  }
];
export { userFormConfig, formDataFields, propList };
