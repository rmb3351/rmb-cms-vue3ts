import type { IFormConfig } from '@/components/form-generator/type';
import type { ITableConfig } from '@/components/table-generator/type';
import type { IModalConfig } from '../modal-generator/type';

export interface IListPageConfig {
  formConfig: IFormConfig;
  tableConfig: ITableConfig;
  modalConfig: IModalConfig;
  dataRaws: any;
}
