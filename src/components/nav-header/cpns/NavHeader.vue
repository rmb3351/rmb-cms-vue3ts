<script setup lang="ts">
import { ref } from 'vue';
import NavUserInfo from './NavUserInfo.vue';
const iconIsFold = ref(true);
// 使用emit父子组件传值是因为父组件也要用到这个值，且父组件可以直接传给nav-menu
const emits = defineEmits(['isFoldChange']);
function handleIconClick() {
  iconIsFold.value = !iconIsFold.value;
  emits('isFoldChange', iconIsFold.value);
}
</script>

<template>
  <div class="NavHeader__wrapper">
    <el-icon class="fold-icon__wrapper" @click="handleIconClick"
      ><Fold v-show="iconIsFold" /><Expand v-show="!iconIsFold"
    /></el-icon>
    <div class="header__content">
      <span>面包屑导航</span>
      <NavUserInfo class="header-user__info"></NavUserInfo>
    </div>
  </div>
</template>

<style lang="less" scoped>
.NavHeader__wrapper {
  height: 100%;
  display: flex;
  align-items: center;
}
.fold-icon__wrapper {
  margin: auto 0;
  font-size: 30px;
  cursor: pointer;
}
.header__content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header-user__info {
    cursor: pointer;
  }
}
</style>
