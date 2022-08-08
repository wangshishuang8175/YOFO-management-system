<template>
  <div>
    <div class="honortitle">荣誉展示</div>
    <!-- 轮播图 -->
    <el-carousel :interval="4000" type="card" height="500px" width="200px">
      <el-carousel-item v-for="item in honors" :key="item.index">
        <!-- <img class="img" :src="honors[3].path" /> -->
        <img class="img" :src="item.path" />
      </el-carousel-item>
    </el-carousel>
    <div class="honortitle">荣誉展示</div>
    <!-- 表格 -->
    <el-table :data="honors" style="width: 100%">
      <!-- id -->
      <el-table-column
        prop="id"
        label="id"
        style="width:30%"
        header-align="center"
        align="center"
      />
      <!-- 图片展示 -->
      <el-table-column
        label="预览图"
        style="width:30%"
        header-align="center"
        align="center"
      >
        <template #default="scope">
          <el-image
            style="width: 150px; height: 250px; object-fit: cover;"
            :src="scope.row.path"
            :preview-src-list="[scope.row.path]"
          ></el-image>
        </template>
      </el-table-column>
      <!-- 删除 -->
      <el-table-column label="Operations" style="width:50%" align="center">
        <template #default="scope">
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row)"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div v-for="item in honors" :key="item.index">
      {{ item }}
    </div> -->
  </div>
</template>

<script>
// 发送请求获取数据
import { getHonorList, deleteHonor } from '@/api/honor'
import { ref } from 'vue'
export default {
  setup() {
    const honors = ref([])

    const getHonors = async () => {
      let result = await getHonorList()
      ;+result.code === 200 ? (honors.value = result.data) : ''
      // if (result.code === 0) {
      //   honors.value = result.data.honors
      // }
    }
    getHonors()
    // 删除操作
    const handleDelete = async row => {
      console.log(row.id, 'oooo')
      let result = await deleteHonor(row.id)
      if (+result.code === 200) {
        honors.value = result.data
      }
    }
    return { honors, handleDelete }
  },
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.img {
  height: 100%;
  width: 100%;
}
.honortitle {
  height: 100px;
  width: 100%;
  text-align: center;
  background-color: rgb(245, 237, 148);
  line-height: 100px;
  font-size: 40px;
}
</style>
