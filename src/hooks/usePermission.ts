import router from '@/router';
import useLogin from '@/store/login/login';

/**
 * @type 枚举'create'|'update'|'delete'|'query'
 */
export enum IPermissionType {
  'create' = 'create',
  'update' = 'update',
  'delete' = 'delete',
  'query' = 'query'
}

/**
 * @returns 返回当前页面匹配权限数组的页面名
 */
export function getPageName() {
  const route = router.currentRoute.value;
  const paths = route.path.split('/');
  let pageName: string;
  switch (paths[paths.length - 1]) {
    case 'user':
      pageName = 'users';
      break;
    default:
      pageName = paths[paths.length - 1];
      break;
  }
  return pageName;
}

/**
 * @param permissionType 权限类型，枚举IPermissionType的'create'|'update'|'delete'|'query'
 * @returns 当前用户当前页面是否包含该权限
 */
function usePermission(permissionType: IPermissionType) {
  const pageName = getPageName();
  const loginStore = useLogin();
  return loginStore.permissions.some(permission =>
    permission.includes(`${pageName}:${permissionType}`)
  );
}

export default usePermission;
