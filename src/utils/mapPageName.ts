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
  const paths = location.href.split('/'); // 用路由对象有可能热更新时获取不正确
  const pageName = paths[paths.length - 1];
  return pageName === 'user' ? 'users' : pageName;
}

/**
 * @returns 当前页面的中文名
 */
export function getPageNameCN() {
  return pageNamesMaps[getPageName()];
}
