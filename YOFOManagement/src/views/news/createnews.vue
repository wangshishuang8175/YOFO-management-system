<template>
  <div class="createPost-container">
    <!--表单-->
    <el-form ref="postFormRef" :model="postForm" :rules="rules" class="form-container">
      <!-- 标题 -->
      <el-row>
        <el-col>
          <el-form-item label-width="60px" style="margin-bottom: 40px" label="标题" class="postInfo-container-item"
            prop="title">
            <el-input name="title" required v-model="postForm.title" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 摘要 -->
      <el-row>
        <el-col :span="18">
          <el-form-item label-width="60px" style="margin-bottom: 40px" label="摘要" class="postInfo-container-item"
            id="myabstract" prop="abstracts">
            <el-input name="abstracts" required v-model="needab" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <div :style="{ textAlign: 'center' }">
            <el-button v-loading="loading" style="margin-left: 10px" type="primary" @click="needmore">
              添加摘要
            </el-button>
          </div>
        </el-col>
        <!-- 标签显示 -->
        <div id="mytag">
          <div v-for=" (item, indexx) in needss" :key="indexx" id="uudd">
            <el-tag id="tags">{{ item }}</el-tag>
          </div>
        </div>

      </el-row>


      <!-- 预览图和发布 -->
      <el-row>
        <el-col :span="18">
          <el-form-item label-width="60px" style="margin-bottom: 40px" label="预览图" class="postInfo-container-item"
            prop="img">
            <el-input name="img" required v-model="postForm.img" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <div :style="{ textAlign: 'center' }">
            <el-button v-loading="loading" style="margin-left: 10px" type="success" @click="submitForm">
              发布
            </el-button>
          </div>
        </el-col>
      </el-row>

      <el-form-item prop="content" style="margin-bottom: 30px">
        <RichEditor :model-value="postForm.content" @update:modelValue="handleUpdateValue"></RichEditor>
      </el-form-item>

    </el-form>
  </div>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue'
import RichEditor from '@/components/Editor/richEditor.vue'
import { createNews } from '@/api/news'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'
import { useStore } from "vuex";
function globaldateFormat(date) {
  var dt = date;
  var y = dt.getFullYear();
  var m = dt.getMonth() + 1;
  var d = dt.getDate();
  var hh = dt.getHours();
  var mm = dt.getMinutes();
  var ss = dt.getSeconds();
  return `${y}年${m}月${d}日`;
};

export default defineComponent({
  components: {
    RichEditor
  },

  setup() {
    const router = useRouter();
    const postFormRef = ref(null)
    const loading = ref(false)
    const { state, getters, dispatch, commit } = useStore();
    const postForm = reactive({
      idx: '', //idx
      title: '', // 文章题目 
      abstracts: [], //摘要
      img: '',
      newsdate: '', // 发布时间
      content: '', // 文章内容
    })
    var needab = ref("摘要")
    var needss = ref([]);
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    const rules = reactive({
      title: [{ validator: validateRequire }],
      content: [{ validator: validateRequire }],
      // abstracts: [{ validator: validateRequire }],
    })
    const needmore = () => {
      needss.value.push(needab.value);
      console.log(needss.value, "llllllllllllllllljjjjjjj");
    };
    const submitForm = () => {
      loading.value = true;
      postFormRef.value.validate(async (valid) => {
        if (valid) {
          // 日期
          let Timer = new Date();
          let Timered = globaldateFormat(Timer);
          postForm.newsdate = Timered;
          // idx
          postForm.idx = state.news.num;
          commit("news/setNum", postForm.idx)
          // 摘要
          postForm.abstracts = needss.value;

          await createNews(postForm)
          ElNotification.success({
            title: '成功',
            message: '发布文章成功',
            type: 'success',
            duration: 2000,
          })
          postFormRef.value.resetFields()
          loading.value = false;

          setTimeout(() => {
            router.push("/news")
          }, 500);
        }
      })
    }

    /**
     * @description  获取接收最新文本
     */
    const handleUpdateValue = (val) => {
      postForm.content = val;
    }
    return {
      handleUpdateValue,
      postForm,
      rules,
      postFormRef,
      submitForm,
      loading,
      state,
      getters,
      dispatch,
      commit,
      needab,
      needmore,
      needss
    }
  }
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

#mytag {
  // margin-bottom: 20px;
  width: 800px !important;
  height: 40px !important;
}
#uudd{
    display: inline-block !important;
}
#tags {
  margin-left: 20px;
  display: inline-block !important;
}

#myabstract {
  margin-bottom: 10px !important;
}
</style>
