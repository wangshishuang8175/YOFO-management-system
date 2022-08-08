<template>
  <div class="createPost-container">
    <!--表单-->
    <el-form
      ref="postFormRef"
      :model="postForm"
      :rules="rules"
      class="form-container"
    >
      <el-row>
        <el-col>
          <el-form-item
            label-width="60px"
            style="margin-bottom: 40px"
            label="活动"
            class="postInfo-container-item"
            prop="title"
          >
            <el-input name="title" required v-model="postForm.title" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item
            label-width="60px"
            style="margin-bottom: 40px"
            label="地点"
            class="postInfo-container-item"
            prop="address"
          >
            <el-input name="title" required v-model="postForm.address" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item
            label-width="60px"
            style="margin-bottom: 40px"
            label="时间"
            class="postInfo-container-item"
            prop="date"
          >
            <el-input name="title" required v-model="postForm.date" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <div :style="{ textAlign: 'center' }">
            <el-button
              v-loading="loading"
              style="margin-left: 10px"
              type="success"
              @click="submitForm"
            >
              发布
            </el-button>
          </div>
        </el-col>
      </el-row>

      <!-- 富文本编辑器 -->

      <!-- <el-form-item prop="content" style="margin-bottom: 30px">
                <RichEditor :model-value="postForm.content" @update:modelValue="handleUpdateValue"></RichEditor>
            </el-form-item> -->
    </el-form>
  </div>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue'
import { createArticle } from '@/api/exhibition'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const postFormRef = ref(null)
    const loading = ref(false)

    const postForm = reactive({
      title: '', // 文章题目
      id: '', //id
    })

    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }

    const rules = reactive({
      title: [{ validator: validateRequire }],
    })

    const submitForm = () => {
      loading.value = true
      postFormRef.value.validate(async valid => {
        if (valid) {
          postForm.publishDate = new Date().getTime()
          postForm.id = Math.floor(Math.random() * 1000) + 100

          await createArticle(postForm)
          ElNotification.success({
            title: '成功',
            message: '发布文章成功',
            type: 'success',
            duration: 2000,
          })
          postFormRef.value.resetFields()
          loading.value = false

          setTimeout(() => {
            router.push('/exhibition/index')
          }, 500)
        }
      })
    }

    /**
     * @description  获取接收最新文本
     */
    const handleUpdateValue = val => {
      postForm.content = val
    }
    return {
      handleUpdateValue,
      postForm,
      rules,
      postFormRef,
      submitForm,
      loading,
    }
  },
})
</script>
<style lang="scss" scoped>
.editorWrapper {
  margin-top: 20px;

  :deep(.w-e-text-container) {
    text-align: left;
  }

  .info {
    text-align: left;
    padding-left: 20px;
    margin-bottom: 20px;
    font-size: 12px;
  }

  .section {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .el-row {
    margin-bottom: 20px;
  }
}
</style>
