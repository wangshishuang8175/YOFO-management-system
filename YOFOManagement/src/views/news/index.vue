<template>
  <div>
    <!-- <el-button type="primary" @click="handleExportExcel">导出excel文件 <i class="el-icon-search"></i> </el-button> -->
    <el-table :data="newsList" stripe style="width: 100%">
      <el-table-column fixed align="center" header-align="center" prop="idx" label="编号" width="80" />
      <el-table-column align="center" header-align="center" prop="newsdate" label="发布时间" width="130" />
      <el-table-column align="center" header-align="center" prop="title" width="200" label="标题" />
      <el-table-column align="center" header-align="center" prop="abstracts" label="摘要" width="160" />
      <!-- 图片展示 -->
      <el-table-column label="预览图" width="300" header-align="center">
        <template #default="scope">
          <el-image style="width: 300px; height: 150px; object-fit: cover;" :src="scope.row.img"
            :preview-src-list="[scope.row.img]">
          </el-image>
        </template>
      </el-table-column>
      <!-- 内容 -->
      <el-table-column label="内容" width="400" :show-overflow-tooltip="true" align="center" header-align="center">
        <template #default="scope">
          <div style="display: flex; align-items: center;" >
            <div class="ellipsis" v-html="scope.row.content"></div>
          </div>
        </template>
      </el-table-column>
      <!-- 删除 -->
      <el-table-column label="删除" width="100">
        <template #default="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row),commit('news/redNum')">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="text-align: center; margin-top: 30px;">
      <el-pagination layout="prev, pager, next" :total="total" :page-size="size" :current-page="current"
        @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, reactive, ref, toRefs } from 'vue'
import { useStore } from "vuex";
import { fetchNews, deleteNews } from '@/api/news'


export default defineComponent({
  name: 'news',
  // components: {
  // },
  setup() {

    const { state, getters, dispatch, commit } = useStore();
    const newsList = ref([]);
    //分页属性
    const pageOptions = reactive({
      size: 4,
      current: 1,
      total: 99,
      handleCurrentChange: (current) => {
        pageOptions.current = current;
        fetchList();
      }
    })
    // 展示
    const fetchList = async () => {
      let result = await fetchNews({ current: pageOptions.current, size: pageOptions.size });
      // console.log(result);
      + result.code === 200 ? newsList.value = result.data : "";
      + result.code === 200 ? pageOptions.total = result.total : "";
      console.log(newsList, "调用");
    }
    fetchList();
    // 删除
    const handleDelete = async (index, row) => {
      console.log(index, row)
      await deleteNews(row.idx)
      await fetchList()

    }

    return {
      newsList, ...toRefs(pageOptions), handleDelete, state,
      getters,
      dispatch,
      commit
    }
  },
})
</script>


<style lang="scss" scoped>
.ellipsis {
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
