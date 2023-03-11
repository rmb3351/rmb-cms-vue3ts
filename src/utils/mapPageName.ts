import router from '@/router';

/* 页面英文和中文名映射 */
const pageNamesMaps: { [name: string]: string } = {
  users: '用户',
  department: '部门',
  menu: '菜单',
  role: '角色',
  category: '类别',
  goods: '商品'
};

/**
 * @returns 当前页面匹配权限数组或接口路径的页面名
 */
export function getPageName() {
  const paths = router.currentRoute.value.path.split('/');
  const pageName = paths[paths.length - 1];
  return pageName === 'user' ? 'users' : pageName;
}

/**
 * @returns 当前页面的中文名
 */
export function getPageNameCN() {
  return pageNamesMaps[getPageName()];
}
