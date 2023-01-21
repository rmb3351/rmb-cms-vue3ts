import type { IFormConfig } from '@/components/form-generator/type';
import type { ITableConfig } from '@/components/table-generator/type';
import type { IModalConfig } from '@/components/modal-generator/type';
import type { IListPageConfig } from '@/components/list-page-generator/type';

/* FormGenerator的配置项 */
const goodFormConfig: IFormConfig = {
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
goodFormConfig.formItems?.forEach(item => {
  formDataRaws[item.field] = item.type === 'datepicker' ? ['', ''] : '';
});
goodFormConfig.formDataRaws = JSON.parse(JSON.stringify(formDataRaws));

/* TableGenerator的配置项 */
const goodTableConfig: ITableConfig = {
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

/* ModalGenerator的配置项 */
const goodModalConfig: IModalConfig = {
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
goodModalConfig.formItems?.forEach(item => {
  formDataRaws[item.field] = item.type === 'datepicker' ? ['', ''] : '';
});
goodModalConfig.formDataRaws = JSON.parse(JSON.stringify(formDataRaws));

const listPageConfig: IListPageConfig = {
  formConfig: goodFormConfig,
  tableConfig: goodTableConfig,
  modalConfig: goodModalConfig,
  dataRaws: formDataRaws
};

export { listPageConfig };
