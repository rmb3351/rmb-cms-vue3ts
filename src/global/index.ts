/* 统一全局注册用的ts */
import type { App } from 'vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { globalFormatter } from './formatter';
import { globalDirectives } from './directives';

/**
 * @param app createApp函数返回值
 * @description 用于全局注册组件等的封装函数
 */
export function globalRegister(app: App) {
  // element图标注册
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
  // $formatter注册
  app.use(globalFormatter);
  // 全局指令注册
  app.use(globalDirectives);
}
