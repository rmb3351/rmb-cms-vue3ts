import { getPageName } from '@/utils/mapPageName';
import useLogin from '@/store/login/login';

/**
 * @type 枚举'create'|'update'|'delete'|'query'|'detail'
 */
export enum IPermissionType {
  'create' = 'create',
  'update' = 'update',
  'delete' = 'delete',
  'query' = 'query',
  'detail' = 'detail'
}

/**
 * @param permissionType 权限类型，枚举IPermissionType的'create'|'update'|'delete'|'query'|'detail'
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
