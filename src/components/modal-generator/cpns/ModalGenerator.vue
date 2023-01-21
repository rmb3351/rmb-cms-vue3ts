<script setup lang="ts">
import { PropType, ref, watch } from 'vue';
import type { IModalConfig } from '../type';
import FormGenerator from '@/components/form-generator';
const props = defineProps({
  modalConfig: {
    type: Object as PropType<IModalConfig>,
    required: true
  }
});
const modalVisible = ref(false);
const modalFormData = ref(props.modalConfig.formDataRaws);

function handleModalConfirm() {
  const trueData: any = {};
  const formValue = modalFormData.value;
  /* 拼接数据，有时间段数组则拆 */
  for (const key in formValue) {
    if (key === 'times') {
      const [createAt, updateAt] = formValue[key];
      trueData.createAt = createAt;
      trueData.updateAt = updateAt;
    } else trueData[key] = formValue[key];
  }
  console.log(trueData);
  modalVisible.value = false;
}

defineExpose({ modalVisible, modalFormData });
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
    <FormGenerator v-bind="modalConfig" v-model="modalFormData">
      <template #form-header>
        {{ null }}
      </template>
      <template #form-footer>
        {{ null }}
      </template>
    </FormGenerator>
    <template #footer>
      <el-button @click="modalVisible = false">取消</el-button>
      <el-button type="primary" @click="handleModalConfirm"> 确定 </el-button>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped></style>
