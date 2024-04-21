import { DefaultOptionType } from 'antd/es/select';

export interface APIResponse<T = any> {
  data?: T;
  status: number;
  error?: string;
  message?: string;
}

export interface IPagination {
  page: number;
  limit: number;
  total: number;
}

export interface IOption extends DefaultOptionType {
  value: number | string;
  label: string;
}
