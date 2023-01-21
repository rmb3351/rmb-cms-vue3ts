import type { IFormConfig } from '@/components/form-generator/type';
import type { ITableConfig } from '@/components/table-generator/type';
import type { IModalConfig } from '@/components/modal-generator/type';
import type { IListPageConfig } from '@/components/list-page-generator/type';

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
let formDataRaws: any = {};
roleFormConfig.formItems?.forEach(item => {
  formDataRaws[item.field] = item.type === 'datepicker' ? ['', ''] : '';
});
roleFormConfig.formDataRaws = JSON.parse(JSON.stringify(formDataRaws));

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
    }
  ],
  isShowSelection: true,
  isShowIndex: true,
  tableTitle: '角色',
  showCommonCol: true
};

/* ModalGenerator的配置项 */
const roleModalConfig: IModalConfig = {
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
  colLayout: {
    span: 24
  },
  // 由于是必传属性，先放个空对象占位
  formDataRaws: {}
};

/* 从ModalGenerator的配置项中抽取字段名生成对象 */
formDataRaws = {};
roleModalConfig.formItems?.forEach(item => {
  formDataRaws[item.field] = item.type === 'datepicker' ? ['', ''] : '';
});
roleModalConfig.formDataRaws = JSON.parse(JSON.stringify(formDataRaws));

const listPageConfig: IListPageConfig = {
  formConfig: roleFormConfig,
  tableConfig: roleTableConfig,
  modalConfig: roleModalConfig,
  dataRaws: formDataRaws
};

export { listPageConfig };
