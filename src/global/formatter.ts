/* 全局注册$formatter，将需要的格式化函数都在其中注册 */
import type { App } from 'vue';
import { formatUtcString } from '@/utils/timeFormat';
import type { IFormatter } from './type';

/**
 * @param app createApp函数返回值
 * @description 用于全局注册格式化方法对象$formatter的封装函数
 */
export function globalFormatter(app: App) {
  const $formatter: IFormatter = {
    formatUtcString
  };
  app.config.globalProperties.$formatter = $formatter;
}
