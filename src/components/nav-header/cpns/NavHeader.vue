<script setup lang="ts">
import { ref } from 'vue';
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
</style>
