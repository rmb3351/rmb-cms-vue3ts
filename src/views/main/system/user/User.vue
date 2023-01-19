<!-- 用户管理页面 -->
<script setup lang="ts">
import { ref } from 'vue';
import ListPageGenerator from '@/components/list-page-generator';
import ModalGenerator from '@/components/modal-generator';
import { listPageConfig, userModalConfig } from './config/config';
import useSystem from '@/store/system/system';

/* 获取用户数据 */
const systemStore = useSystem();

/* modal关联逻辑处理 */
const modalRef = ref<InstanceType<typeof ModalGenerator>>();

/* 新建、编辑按钮点击处理逻辑 */
function showModal(data: any) {
  modalRef.value!.modalVisible = true;
  modalRef.value!.modelFormData = { ...data };
}
</script>

<template>
  <div class="User__wrapper">
    <ListPageGenerator
      :listPageConfig="listPageConfig"
      :getDataFn="systemStore.userManagementAction"
      :dataSource="systemStore.userLists"
      :totalCount="systemStore.userCount"
      @showModal="showModal"
    >
      <!-- TableGenerator内定制化插槽的使用 -->
      <template #status="scope">
        <span>{{ scope.row.enable === 1 ? '在用' : '弃用' }}</span>
      </template>
    </ListPageGenerator>
    <ModalGenerator
      ref="modalRef"
      :modalConfig="userModalConfig"
    ></ModalGenerator>
  </div>
</template>

<style lang="less" scoped></style>
