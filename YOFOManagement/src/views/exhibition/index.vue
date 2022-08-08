<template>
  <div>
    <el-table :data="exhibitionList" stripe style="width: 100%">
      <el-table-column
        align="center"
        header-align="center"
        prop="title"
        label="活动"
      />
      <el-table-column
        align="center"
        header-align="center"
        prop="address"
        label="地点"
      />
      <el-table-column
        align="center"
        header-align="center"
        prop="date"
        label="时间"
      />

      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { ref } from 'vue'
import { fetchArticleList, deleteArticle } from '@/api/exhibition'

export default {
  setup() {
    const exhibitionList = ref([])

    const fatchList = async () => {
      let result = await fetchArticleList()
      console.log(result)

      result.code === 0 ? (exhibitionList.value = result.data) : ''
    }
    fatchList()

    // 删除文章
    const handleDelete = async (index, row) => {
      console.log(index, row)
      await deleteArticle(row.id)
      //   删除成功获取新的数据
      await fatchList()
    }

    return { exhibitionList, handleDelete }
  },
}
</script>
