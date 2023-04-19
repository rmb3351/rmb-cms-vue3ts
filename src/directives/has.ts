import type { Directive, DirectiveBinding } from 'vue';
import usePermission, { IPermissionType } from '@/hooks/usePermission';
/* 组件挂载时校验是否具有相应页面的相应权限，如没有则卸载 */
const has: Directive = {
  mounted(el: HTMLElement, bindings: DirectiveBinding<IPermissionType>) {
    switch (bindings.value) {
      case IPermissionType['create']:
      case IPermissionType['update']:
      case IPermissionType['delete']:
      case IPermissionType['query']:
      case IPermissionType['detail']:
        if (!usePermission(bindings.value))
          el.parentNode && el.parentNode.removeChild(el);
        break;
      default:
        // 枚举漏写提示
        const tips: never = bindings.value;
        // 由于无法限制v-has的属性值填写，所以要在意外填写时添加错误提示
        console.error(
          `无效值：${bindings.value}。v-has指令的值应为'create' | 'update' | 'delete' | 'query' | 'detail'之一，可以使用IPermissionType枚举`
        );
        break;
    }
  }
};

export default has;
