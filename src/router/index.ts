import { createRouter, createWebHashHistory } from 'vue-router';
// type不加也可以，为了区分这个是类型不是函数
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('views/login/Login.vue')
  },
  {
    path: '/main',
    component: () => import('views/main/Main.vue')
  }
];

const router = createRouter({
  routes,
  history: createWebHashHistory()
});

export default router;
