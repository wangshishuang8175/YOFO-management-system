<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="案例名称">
        <el-input v-model="formInline.name" />
      </el-form-item>
      <el-form-item label="案例类型">
        <el-select v-model="formInline.type">
          <el-option v-for="item in type_list" :key="item[1]" :label="item[0]" :value="item" />
        </el-select>
      </el-form-item>

      <el-upload v-model:file-list="fileList" class="upload" :on-preview="handlePreview" :on-remove="handleRemove"
        :on-success="handleSuccess" list-type="picture" :http-request="upload" action ref="uploadf">
        <el-button type="primary">图片上传</el-button>
        <template #tip>
          <div class="el-upload__tip"></div>
        </template>
      </el-upload>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { UploadImage } from '@/api/user'
import { caseAdd, caseType } from '@/api/case'
import { ElMessage } from 'element-plus'

const formInline = reactive({
  name: '',
  type: '',
})
let fileList = reactive([])
const uploadf = ref(null)
let imageList = reactive([])
//获取案例类型数据
let type_list = ref(null)

const case_type = async () => {
  let result = await caseType()
  type_list.value = result.data.map((item => item.type))
  console.log(type_list,"xxxxxxxxxxxxx")
}
case_type()

//点击添加
const onSubmit = async () => {

  if (formInline.name === "" || formInline.type === "" || imageList === [])
    return ElMessage({
      message: '内容不能为空！',
      grouping: true,
      type: 'warning',
    });

  const data = {
    ...formInline, img: [...imageList]
  }
  let result = await caseAdd(data)

  //清空表单
  uploadf.value && uploadf.value.clearFiles()
  imageList = reactive([])
  formInline.name = ""
  formInline.type = ""

  //上传成功提示
  if (result.code === 0) {
    ElMessage({
      message: '上传成功',
      grouping: true,
      type: 'success',
    })
  }
  // location.reload()
}


const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
  imageList = imageList.filter(item => item.uid != uploadFile.uid)
}

const handlePreview = file => {
  // console.log(file)
}
const handleSuccess = (uploadFile, uploadFiles) => {
  console.log(uploadFiles.uid, uploadFiles.name)
  imageList[imageList.length - 1].uid = uploadFiles.uid
}

//图片上传

// const imageUrl = ref('')
//图片上传成功
// const handleAvatarSuccess = (
//   response,
//   uploadFile
// ) => {
//   imageUrl.value = URL.createObjectURL(uploadFile.raw)
// }

// //在图片上传之前做的事情
// const beforeAvatarUpload = (rawFile) => {
//     if (rawFile.type !== 'image/jpeg') {
//         ElMessage.error('Avatar picture must be JPG format!')
//         return false
//     } else if (rawFile.size / 1024 / 1024 > 10) {
//         ElMessage.error('Avatar picture size can not exceed 10MB!')
//         return false
//     }
//     return true
// }
const upload = async f => {
  // 1. 获取表单数据   fromData 表单数据
  let fromData = new FormData()
  fromData.append('file', f.file)

  // 2. 发起请求
  let result = await UploadImage(fromData, 'cases')
  console.log(result, 'result')
  imageList.push(result)
  // fileList = reactive([])
}
</script>

<style lang="scss" scoped>
.data_section {
  padding: 10px;

  .row_list {
    margin-bottom: 20px;
  }

  .pay {
    background-color: #18a689;
  }

  .income {
    background-color: #99cc00;
  }

  .hidden_investors {
    background-color: #33cc99;
  }

  .intention_investors {
    background-color: #3b5999;
  }

  .waitpending_investors {
    background-color: #66cc99;
  }

  .pending_investors {
    background-color: #009999;
  }

  .pass_investors {
    background-color: #ff9900;
  }

  .newadd_investors {
    background-color: #0099cc;
  }

  .data_list {
    text-align: center;
    font-size: 14px;
    border-radius: 6px;
    padding: 15px 0;
    color: #fff;

    .list_number {
      font-size: 16px;
      font-weight: bold;
    }

    .number {
      font-size: 16px;
      font-weight: bold;
    }
  }


}

.upload {
  margin-bottom: 50px;

  &+.el-form-item {

    width: 100%;

    .el-form-item__content {
      button {
        float: right;
      }

    }


  }
}
</style>
