import type { IFormConfig } from '@/components/form-generator/type';
import type { ITableConfig } from '@/components/table-generator/type';
import type { IListPageConfig } from '@/components/list-page-generator/type';

/* FormGenerator的配置项 */
const menuFormConfig: IFormConfig = {
  formItems: [
    {
      type: 'input',
      label: '菜单名',
      placeholder: '请输入菜单名',
      field: 'name'
    },
    {
      type: 'select',
      label: '类型',
      placeholder: '请选择菜单类型',
      field: 'type'
    },
    {
      type: 'input',
      label: '路径',
      placeholder: '请输入路径',
      field: 'url'
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
menuFormConfig.formItems?.forEach(item => {
  formDataRaws[item.field] = item.type === 'datepicker' ? ['', ''] : '';
});
// 初始值对象放入formConfig替换空对象（因为必传），FormGenerator重置时用得上
menuFormConfig.formDataRaws = formDataRaws;

/* TableGenerator的配置项 */
const menuTableConfig: ITableConfig = {
  propList: [
    {
      prop: 'name',
      'min-width': '100',
      label: '菜单名称'
    },
    {
      prop: 'type',
      'min-width': '60',
      label: '类型'
    },
    {
      prop: 'url',
      'min-width': '100',
      label: '菜单路径'
    },
    {
      prop: 'icon',
      'min-width': '100',
      label: '菜单图标',
      slotName: 'icon'
    },
    {
      prop: 'permission',
      'min-width': '100',
      label: '菜单权限'
    }
  ],
  tableTitle: '菜单',
  childrenProps: {
    rowKey: 'id',
    treeProps: {
      children: 'children'
    }
  },
  showCommonCol: true,
  showFooter: false
};

const listPageConfig: IListPageConfig = {
  formConfig: menuFormConfig,
  dataRaws: formDataRaws,
  tableConfig: menuTableConfig
};

// 初始值对象也单独导出，给具体的FormGenerator父组件使用
export { listPageConfig };
