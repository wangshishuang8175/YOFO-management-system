<template>
  <div class="createPost-container">
    <!--表单-->
    <el-form
      ref="postFormRef"
      :model="postForm"
      class="form-container"
    >
      <el-row>
        <el-col>
          <el-form-item
            label-width="60px"
            style="margin-bottom: 40px"
            label="id"
            class="postInfo-container-item"
            prop="title"
          >
            <el-input name="title" required v-model="postForm.id" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-upload
            class="avatar-uploader"
            action="/api/upload/upImg"
            :show-file-list="false"
            :http-request="upload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              +
            </el-icon>
          </el-upload>
        </el-col>
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
    </el-form>
  </div>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue'
import RichEditor from '@/components/Editor/richEditor.vue'
import { createHonor,UploadImage } from '@/api/honor'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

export default defineComponent({
  setup() {
    const router = useRouter()
    const postFormRef = ref(null)
    const loading = ref(false)

    const postForm = reactive({
      id: '', //id
      path: '',
    })

    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }

    const rules = reactive({
      id: [{ validator: validateRequire }],
     
    })

    const submitForm = () => {
      loading.value = true
      postFormRef.value.validate(async valid => {
        if (valid) {
          await createHonor(postForm)
          ElNotification.success({
            title: '成功',
            message: '发布文章成功',
            type: 'success',
            duration: 2000,
          })
          postFormRef.value.resetFields()
          loading.value = false

          setTimeout(() => {
            router.push('/honor')
          }, 500)
        }
      })
    }

    //图片上传
    const imageUrl = ref('')
    //图片上传成功
    const handleAvatarSuccess = (response, uploadFile) => {
      imageUrl.value = URL.createObjectURL(uploadFile.raw)
    }
    //在图片上传之前做的事情
    const beforeAvatarUpload = rawFile => {
      if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('Avatar picture must be JPG format!')
        return false
      } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
      }
      return true
    }

    const upload = async f => {
      console.log(f)
      // 1. 获取表单数据   fromData 表单数据
      let fromData = new FormData()
      fromData.append('file', f.file)
      // 2. 发起请求
      let result = await UploadImage(fromData)
      imageUrl.value = result.url
      //把imageUrl给postForm.path
      postForm.path = imageUrl
      //把url存到vuex
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
      imageUrl,
      handleAvatarSuccess,
      beforeAvatarUpload,
      upload,
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

<style>
.avatar-uploader .el-upload {
  border: 1px dashed gray;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: 500ms;
}

.avatar-uploader .el-upload:hover {
  border-color: gray;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
  line-height: 178px;
}
</style>
