import type { RouteRecordRaw } from 'vue-router';
import type { IMenus } from '@/service/request/login/type';
// 这里不要使用useRouter，因为不是在组件内部
import router from '@/router';
/**
 *
 * @param userMenus 用户角色匹配的菜单
 * @returns 菜单对应的权限路由
 */
export function mapMenusToRoutes(userMenus: IMenus[]): RouteRecordRaw[] {
  // 当前用户权限路由数组
  const authRoutes: RouteRecordRaw[] = [];
  // 所有路由数组
  const allRoutes: RouteRecordRaw[] = [];
  /* 找到router文件夹下所有菜单对应路由的ts文件 */
  const routeFiles = import.meta.glob('../router/*/*/*.ts');
  const routeFilesLength = Object.keys(routeFiles).length;

  // 匹配菜单并添加对应的权限路由
  function addAuthRoute(menus: IMenus[]) {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find(route => route.path === menu.url);
        if (route) authRoutes.push(route);
        else console.log(menu.url, '未匹配');
      } else addAuthRoute(menu.children);
    }
  }

  /* 将这些文件里导出的route对象全都放到allRoutes里，然后开始添加权限路由，添加完毕后逐个注册路由 */
  Object.keys(routeFiles).forEach(key => {
    import(/* @vite-ignore */ key).then(res => {
      allRoutes.push(res.default);
      if (allRoutes.length === routeFilesLength) {
        addAuthRoute(userMenus);
        authRoutes.forEach(route => router.addRoute('main', route));
      }
    });
  });

  return authRoutes;
}
