import { createRouter, createWebHashHistory } from 'vue-router';
// type不加也可以，为了区分这个是类型不是函数
import type { RouteRecordRaw } from 'vue-router';
import loCache from '@/utils/loCache';
import { getCurrentFirstMenu } from '@/utils/mapMenus';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('views/login/Login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('views/main/Main.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('components/not-found/cpns/NotFound.vue')
  }
];

const router = createRouter({
  routes,
  history: createWebHashHistory()
});
router.beforeEach((to, from) => {
  if (to.path !== '/login') {
    const token = loCache.get('token');
    if (!token) return '/login';
    else {
      const tokenExpireTime = loCache.get('tokenExpireTime');
      if (!tokenExpireTime || tokenExpireTime <= Date.now()) {
        loCache.remove('token');
        ElMessage.error('您的登录已经过期，请重新登录！');
        return '/login';
      }
    }
  }
  // 自动定位到第一个可跳转菜单（如果有）
  if (to.path === '/main') {
    const userMenus = loCache.get('userMenus');
    const firstMenu = getCurrentFirstMenu(userMenus);
    if (firstMenu) return firstMenu.url!;
  }
});
export default router;
