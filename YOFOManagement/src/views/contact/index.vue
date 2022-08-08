<template>
  <div>
    <el-input type="text" placeholder="请输入昵称进行查找" v-model="stext" maxlength="10" show-word-limit @input="serach()" class="iiin">
    </el-input>
    <!-- <el-button type="primary" @click="handleExportExcel">导出excel文件 <i class="el-icon-search"></i> </el-button> -->
    <el-table :data="contactList" stripe style="width: 100%">
      <el-table-column fixed align="center" header-align="center" prop="nickname" label="昵称" width="180" />
      <el-table-column align="center" header-align="center" prop="email" label="邮箱" width="180" />
      <el-table-column align="center" header-align="center" prop="phonenumber" width="180" label="联系方式" />
      <el-table-column align="center" header-align="center" prop="job" label="工作单位" width="180" />
      <!-- 内容 -->
      <el-table-column label="留言" width="460" :show-overflow-tooltip="true" align="center" header-align="center">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <div class="ellipsis" v-text="scope.row.leaveword"></div>
          </div>
        </template>
      </el-table-column>
      <!-- 删除 -->
      <el-table-column label="删除" width="100">
        <template #default="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
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
import { contactMe, deleteContact } from '@/api/mytest'


export default defineComponent({
  name: 'contact',
  // components: {
  // },
  setup() {
    const { state, getters, dispatch, commit } = useStore();
    // 搜索
    const stext = ref("");
    const contactList = ref([]);
    // 分页属性
    const pageOptions = reactive({
      size: 4,
      current: 1,
      total: 99,
      handleCurrentChange: (current) => {
        pageOptions.current = current;
        contactMe();
      }
    })
    // 展示
    const Weneed = async () => {
      let result = await contactMe({ current: pageOptions.current, size: pageOptions.size });
      // console.log(result);
      + result.code === 200 ? contactList.value = result.data : "";
      + result.code === 200 ? pageOptions.total = result.total : "";
      // console.log(contactMe, "调用");
    }
    Weneed();
    // 删除
    const handleDelete = async (index, row) => {
      console.log(index, row)
      await deleteContact(row._id)
      await Weneed()
    }
    const serach = async () => {
      // console.log(stext.value, "asa")
      let result = await contactMe({ current: 1, size: 4});
      let rd = result.data;
      let serchlist = [];
      for (let i = 0; i < rd.length; i++) {
        if (rd[i].nickname.indexOf(stext.value) != -1) {
           serchlist.push(rd[i]);
          // return serchlist   这里return就退出函数了
          // console.log(rd[i].nickname.indexOf("是"));
          // console.log(serchlist,"ssxxxrrrrxxx");
        } 
      }
      console.log(stext.value);

         + result.code === 200 ? contactList.value =serchlist: "";
      // console.log(serchlist, "sssxxx");
    }
    return {
      contactList,
      handleDelete,
      ...toRefs(pageOptions),
      getters,
      state,
      dispatch,
      commit,
      stext,
      serach
    }
  },
})
</script>


<style lang="scss" scoped>
.iiin{
  margin-bottom: 20px;
}
.ellipsis {
  // display: -webkit-box;
  // text-overflow: ellipsis;
  // overflow: hidden;
  // -webkit-line-clamp: 2;
  // -webkit-box-orient: vertical;
  width: 460px;
  /*第一步： 溢出隐藏 */
  overflow: hidden;
  /* 第二步：让文本不会换行， 在同一行继续 */
  white-space: nowrap;
  /* 第三步：用省略号来代表未显示完的文本 */
  text-overflow: ellipsis;
}
</style>
