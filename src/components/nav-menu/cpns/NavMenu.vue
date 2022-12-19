<script setup lang="ts">
import useLogin from '@/store/login/login';
import { computed } from '@vue/runtime-core';
const loginStore = useLogin();
/* 抽菜单的index属性和icon属性出来 */
const menuIndex = computed(() => {
  return (id: number): string => id.toString();
});
const menuIcon = computed(() => {
  return (icon: string): string => icon.replace('el-icon', '');
});
</script>

<template>
  <div class="NavMenu__wrapper">
    <div class="menu-logo__wrapper">
      <img src="~@/assets/img/logo.svg" alt="logo" />
      <span>rmb-cms</span>
    </div>
    <div class="menu-content__wrapper">
      <!-- 这里默认子菜单没有子菜单且没有图标，第一级菜单有图标，如果有变化，可以修改或者不使用template写法 -->
      <el-menu default-active="2" class="el-menu-vertical-demo">
        <template v-for="mainMenu in loginStore.userMenus" :key="mainMenu.id">
          <!-- 有子菜单的一级菜单 -->
          <el-sub-menu
            v-if="mainMenu.type === 1"
            :index="menuIndex(mainMenu.id)"
          >
            <!-- 菜单标题插槽 -->
            <template #title>
              <el-icon>
                <component :is="menuIcon(mainMenu.icon)"></component>
              </el-icon>
              <span>{{ mainMenu.name }}</span>
            </template>
            <!-- 遍历子菜单 -->
            <template v-for="subMenu in mainMenu.children" :key="subMenu.id">
              <el-menu-item :index="menuIndex(subMenu.id)">
                <span>{{ subMenu.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
          <!-- 无子菜单的一级菜单：直接渲染 -->
          <el-menu-item v-else :index="menuIndex(mainMenu.id)">
            <el-menu-item>
              <el-icon>
                <component :is="menuIcon(mainMenu.icon)"></component>
              </el-icon>
              <span>{{ mainMenu.name }}</span>
            </el-menu-item>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<style lang="less" scoped>
.menu-logo__wrapper {
  height: 60px;
  display: flex;
  align-items: center;
  img {
    height: 60%;
    margin: 0 10px;
  }
  span {
    font-size: 16px;
    color: #fff;
  }
}
</style>
