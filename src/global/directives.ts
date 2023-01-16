/* 全局引入directives文件夹统一导出的指令并逐个注册 */
import type { App } from 'vue';
import directives from '@/directives';

/**
 * @param app createApp函数返回值
 * @description 用于全局注册指令
 */
export function globalDirectives(app: App) {
  Object.keys(directives).forEach(key => app.directive(key, directives[key]));
}
