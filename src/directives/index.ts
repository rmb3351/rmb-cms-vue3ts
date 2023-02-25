/* 逐个引入指令并统一导出 */
import type { Directive } from 'vue';
import has from './has';
interface IDirectives {
  [key: string]: Directive;
}
const directives: IDirectives = { has };
export default directives;
