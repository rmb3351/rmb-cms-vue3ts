<script setup lang="ts">
import { PropType, ref } from 'vue';
import type { IModalConfig } from '../type';
import FormGenerator from '@/components/form-generator';
const props = defineProps({
  modalConfig: {
    type: Object as PropType<IModalConfig>,
    required: true
  }
});
const modalVisible = ref(false);
const modelFormData = ref(props.modalConfig.formDataRaws);

defineExpose({ modalVisible, modelFormData });
</script>

<template>
  <el-dialog
    class="ModalGenerator__wrapper"
    v-model="modalVisible"
    title="新建某某某"
    width="30%"
    center
    destroy-on-close
  >
    <!-- 将modalConfig直接传给FormGenerator作formConfig用 -->
    <FormGenerator v-bind="modalConfig" v-model="modelFormData">
      <template #form-header>
        {{ null }}
      </template>
      <template #form-footer>
        {{ null }}
      </template>
    </FormGenerator>
    <template #footer>
      <el-button @click="modalVisible = false">取消</el-button>
      <el-button type="primary" @click="modalVisible = false"> 确定 </el-button>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped></style>
