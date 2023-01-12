import type { IFormConfig } from '@/components/form-generator/type';
import type { ITableConfig } from '@/components/table-generator/type';

export interface IListPageConfig {
  formConfig: IFormConfig;
  tableConfig: ITableConfig;
  dataRaws: any;
}
