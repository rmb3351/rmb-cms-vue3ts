<script setup lang="ts">
import { PropType, ref, computed } from 'vue';
import type { IModalConfig } from '../type';
import FormGenerator from '@/components/form-generator';
import { getPageName, getPageNameCN } from '@/utils/mapPageName';
import useCommon from '@/store/common/common';

const props = defineProps({
  modalConfig: {
    type: Object as PropType<IModalConfig>,
    required: true
  },
  /* 提供给使用默认插槽渲染其他组件的页面传递数据 */
  modalExtraInfo: {
    type: Object,
    default: () => ({})
  }
});
const emits = defineEmits(['searchAfterModify']);
const modalVisible = ref(false);
const modalFormData = ref(props.modalConfig.formDataRaws);
// 默认是编辑弹窗
const modalIsCreate = ref(false);
// 显示的标题栏
const titleText = computed<string>(
  () => `${modalIsCreate.value ? '新建' : '编辑'}${getPageNameCN()}`
);

const commonStore = useCommon();
/**
 * @description 摘取有效信息，判断是新建还是编辑，并发送对应请求
 */
async function handleModalConfirm() {
  const formValue = modalFormData.value;
  /* 拼接数据，只提交有用数据 */
  const trueData: any = { ...formValue, ...props.modalExtraInfo };

  let res;
  if (modalIsCreate.value)
    res = await commonStore.createItemAction(`/${getPageName()}`, trueData);
  else {
    /* 编辑提交时将多余属性删掉 */
    props.modalConfig.formItemsOnlyInCreate?.forEach(
      item => delete trueData[item.field]
    );
    if (trueData.createAt) delete trueData.createAt;
    if (trueData.updateAt) delete trueData.updateAt;
    res = await commonStore.editItemByIdAction(
      `/${getPageName()}/${trueData.id}`,
      trueData
    );
  }
  // 这里偷懒，直接用返回的提示，提示有误为接口问题
  if (res.code === 0) {
    ElMessage.success(res.data);
    emits('searchAfterModify');
  } else {
    ElMessage.error(res.data);
    return;
  }
  modalVisible.value = false;
}

defineExpose({ modalVisible, modalFormData, modalIsCreate });
</script>

<template>
  <el-dialog
    class="ModalGenerator__wrapper"
    v-model="modalVisible"
    :title="titleText"
    width="30%"
    center
    destroy-on-close
  >
    <!-- 将modalConfig直接传给FormGenerator作formConfig用 -->
    <FormGenerator
      v-bind="modalConfig"
      v-model="modalFormData"
      :modalIsCreate="modalIsCreate"
    >
      <template #form-header>
        {{ null }}
      </template>
      <template #form-footer>
        {{ null }}
      </template>
    </FormGenerator>
    <!-- 除了默认的form以外还需要特别渲染的组件 -->
    <slot></slot>
    <template #footer>
      <el-button @click="modalVisible = false">取消</el-button>
      <el-button type="primary" @click="handleModalConfirm"> 确定 </el-button>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped></style>
