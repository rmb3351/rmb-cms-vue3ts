/* 逐个引入指令并统一导出 */
import type { Directive } from 'vue';
import has from './has';
interface IDirectiveObj {
  [key: string]: Directive;
}
const directiveObj: IDirectiveObj = { has };
export default directiveObj;
