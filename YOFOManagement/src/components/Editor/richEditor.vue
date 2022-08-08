<template>
  <div class="editor-container">
    <div ref="reditor"></div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, toRefs, watch } from 'vue'
import E from 'wangeditor'

export default defineComponent({
  name: 'RichEditor',
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const reditor = ref() // 富文本引用
    const { modelValue } = toRefs(props)
    let editor;

    onMounted(() => {
      // 创建一个富文本编辑器对象
      editor = new E(reditor.value)
      // 配置 onchange 回调函数 (每当富文本编辑器内容发生改变就会子传父)
      editor.config.onchange = (newHtml) => {
        emit('update:modelValue', newHtml)
      }

      // 配置触发 onchange 的时间频率，默认为 200ms
      editor.config.onchangeTimeout = 500 // 修改为 500ms
      editor.create()

      // 使用 "父组件或本组件" 的默认数据 进行初始化
      editor.txt.html(modelValue.value)
    })
    watch(modelValue, (newValue) => {
      if (newValue !== editor.txt.html()) {
        editor.txt.html(newValue)    //根据父组件传来的值设置html值
      }
    })
    return {
      reditor
    }
  }
})
</script>
<style lang="scss" scoped>
.editor-container {
  :deep(.w-e-text-container) {
    text-align: left;
  }
}
</style>
