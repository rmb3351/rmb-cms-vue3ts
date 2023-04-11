<script setup lang="ts">
import { watch, onMounted, onBeforeUnmount, ref, reactive } from 'vue';
import type Editor from 'wangeditor';
import WangEditor from 'wangeditor';
import type { IEditorInfo } from '../type';
const props = withDefaults(
  defineProps<{
    value: string;
    zIndex?: number;
    height?: number;
    width?: number;
    focus?: boolean;
  }>(),
  {
    zIndex: 500,
    height: 500,
    focus: false
  }
);
const emits = defineEmits<{
  (e: 'update:value', html: string): void;
}>();

const editorRef = ref<HTMLDivElement>();
// 区分是onchange修改的内容还是initEditorContent函数修改的内容
const isInitContent = ref(false);
// editor的内容数据
const content = reactive<IEditorInfo>({
  html: '', // 富文本转成的html
  text: '' // 纯文本内容
});
const editorInstance = ref<Editor | null>(null);
onMounted(() => {
  createWangEditor();
});
/**
 * @description 创建wangeditor实例，添加默认配置，更新内容
 */
function createWangEditor() {
  editorInstance.value = new WangEditor(editorRef.value);
  setEditorConfig();
  editorInstance.value.create();
  initEditorContent(props.value);
}

/**
 * @description 设置富文本编辑器的配置、菜单，监听文本内容改变
 */
function setEditorConfig() {
  if (!editorInstance.value) return;
  const editor = editorInstance.value;
  // 设置编辑区域高度为 500px
  editor.config.height = props.height;
  // 设置z-index
  editor.config.zIndex = props.zIndex;
  // 取消自动 focus
  editor.config.focus = props.focus;
  // 配置 onchange 回调函数
  editor.config.onchange = (newHtml: string) => {
    content.html = newHtml;
    content.text = editor.txt.text();
    /* 不是props更新的，更新父组件内的双向绑定value的值，再标记为 false */
    if (!isInitContent.value) emits('update:value', newHtml);
    isInitContent.value = false;
  };
  // 配置触发 onchange 的时间频率，默认为 200ms
  editor.config.onchangeTimeout = 300; // 修改为 300ms
  // 配置菜单栏，删减菜单，调整顺序
  editor.config.menus = [
    'head',
    'bold',
    'fontSize',
    'fontName',
    'italic',
    'underline',
    'strikeThrough',
    'indent',
    'lineHeight',
    'foreColor',
    'backColor',
    'link',
    'list',
    // 'todo',
    'justify',
    'quote',
    // 'emoticon',
    // 'image',
    // 'video',
    // 'table',
    'code',
    'splitLine',
    'undo',
    'redo'
  ];
}

/**
 * @param htmlStr 传入的html字符串
 * @param isFocus 是否聚焦
 * @description 页面挂载后初始化editor实例时或props.value修改后，更新editor实例的聚焦状态和富文本内容
 */
function initEditorContent(htmlStr: string, isFocus = false) {
  if (!editorInstance.value) return;
  const editor = editorInstance.value;
  editor.config.focus = isFocus;
  if (!htmlStr) return;
  isInitContent.value = true;
  editor.txt.html(htmlStr);
}
// 监视props里的value属性，使用getter函数形式写法
watch(
  () => props.value,
  () => initEditorContent(props.value, true)
);

// 销毁实例
onBeforeUnmount(() => {
  if (!editorInstance.value) return;
  editorInstance.value.destroy();
  editorInstance.value = null;
});
defineExpose({ content });
</script>

<template>
  <div class="RichEditor__wrapper">
    <div
      ref="editorRef"
      class="rich-editor"
      :style="{ width: width ? `${width}px` : '100%' }"
    ></div>
  </div>
</template>

<style lang="less" scoped>
.rich-editor {
  text-align: left;
}
</style>
