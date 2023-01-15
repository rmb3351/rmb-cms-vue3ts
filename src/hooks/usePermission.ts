import useLogin from '@/store/login/login';

/**
 *
 * @param pageName 当前页面名
 * @returns 当前页面的权限对象：{['权限名']:boolean}
 */
function usePermission(pageName: string) {
  const loginStore = useLogin();
  const allPermissions = ['create', 'update', 'delete', 'query'];
  const permissionObj: any = {};
  for (const permissionStr of loginStore.permissions) {
    for (const permission of allPermissions) {
      if (permissionStr.includes(`${pageName}:${permission}`))
        permissionObj[permission] = true;
    }

    if (Object.values(permissionObj).length === allPermissions.length) break;
  }

  // undefined转boolean
  for (const permission of allPermissions)
    permissionObj[permission] = !!permissionObj[permission];

  return permissionObj;
}

export default usePermission;
