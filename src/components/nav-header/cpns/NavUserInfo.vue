<script setup lang="ts">
import useLogin from '@/store/login/login';
const loginStore = useLogin();
</script>

<template>
  <div class="NavUserInfo__wrapper">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          size="small"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
        <span class="name__content">{{ loginStore.userInfo.name }}</span>
        <el-icon class="el-icon--right"><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="Edit">修改信息</el-dropdown-item>
          <el-dropdown-item icon="SwitchButton"> 注销登录 </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="less" scoped>
.el-dropdown-link {
  display: flex;
  align-items: center;
  .name__content {
    margin-left: 5px;
  }
}
</style>
