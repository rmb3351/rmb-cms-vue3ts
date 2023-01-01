type IFormType = 'input' | 'password' | 'select' | 'datepicker';
interface ISelectOptions {
  label?: string;
  value: string | number;
}

// 单个formItem可以传的配置项类型限制
export interface IFormItem {
  type: IFormType;
  label: string;
  field: string;
  rules?: any[];
  placeholder?: string;
  // select的子项
  options?: ISelectOptions[];
  otherOptions?: any;
}

// 表单列布局可以传的配置项类型限制
export interface IColLayout {
  span?: number;
  offset?: number;
  push?: number;
  pull?: number;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

// 整个表单可以传的配置项类型限制
export interface IFormConfig {
  formItems?: IFormItem[];
  labelWidth?: string;
  itemStyle?: any;
  colLayout?: IColLayout;
}
