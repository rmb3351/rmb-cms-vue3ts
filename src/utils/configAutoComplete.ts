import type { IFormConfig } from '@/components/form-generator/type';
import type { ITableConfig } from '@/components/table-generator/type';
import type { IModalConfig } from '@/components/modal-generator/type';
import type { IListPageConfig } from '@/components/list-page-generator/type';

/**
 * @param formConfig FormGenerator的配置项
 * @param tableConfig TableGenerator的配置项
 * @returns ListPageGenerator的配置项
 * @description 根据传入的form和table的配置项，自动补全成listPage的配置项
 */
export function configAutoComplete(
  formConfig: IFormConfig,
  tableConfig: ITableConfig
): IListPageConfig {
  /* 从FormGenerator的配置项中抽取字段名生成对象 */
  const dataRaws: any = {};
  formConfig.formItems?.forEach(item => {
    dataRaws[item.field] = item.type === 'datepicker' ? ['', ''] : '';
  });
  // 初始值对象放入formConfig替换空对象（因为必传），FormGenerator重置时用得上
  formConfig.formDataRaws = JSON.parse(JSON.stringify(dataRaws));

  /* ModalGenerator的配置项：照搬formConfig，再加上colLayout即可 */
  const modalConfig: IModalConfig = JSON.parse(JSON.stringify(formConfig));
  modalConfig.colLayout = {
    span: 24
  };

  return {
    formConfig,
    tableConfig,
    modalConfig,
    dataRaws
  };
}
