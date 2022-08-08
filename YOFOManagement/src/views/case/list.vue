<template>
    <el-table :data="CaseLists" stripe style="width: 100%">
        <el-table-column align="center" header-align="center" prop="id" label="编号" width="120" />
        <el-table-column align="center" header-align="center" prop="name" label="名称" width="180" />
        <el-table-column align="center" header-align="center" prop="type[0]" label="类型" width="180" />
        <el-table-column label="内容" width="500" header-align="center">
            <template #default="scope">
                <img v-for="item in scope.row.img.slice(0, 4)" :key="item" :src="item" alt="" :style="{
                    width: '100px', height: '70px', borderRadius: '5px', marginRight: '10px'
                }">
            </template>
        </el-table-column>
        <el-table-column label="操作" width="280" header-align="center">
            <template #default="scope">
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
                    Delete
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- <div style="text-align: center; margin-top: 30px;">
        <el-pagination layout="prev, pager, next" :total="total" :page-size="size" :current-page="current"
            @current-change="handleCurrentChange" />
    </div> -->
</template>

<script>
import { reactive, ref, toRefs } from 'vue'
import { caseGet, caseDelete } from '@/api/case'
import { ElMessage } from 'element-plus'
export default {
    setup() {
        const CaseLists = ref();
        const CaseList = async () => {
            let result = await caseGet({});
            console.log(result);
            //+ result.code === 0 ? CaseList.value = result.data : "";
            // + result.code === 0 ? pageOptions.total = result.total : "";
            CaseLists.value = result.data
            CaseLists.value.map((item, index) => { item.id = index + 1 })
        }


        CaseList();
        const handleDelete = async (idx, row) => {

            let result = await caseDelete({ id: row._id })
            let result2 = await caseGet({})
            CaseLists.value = result2.data
            CaseLists.value.map((item, index) => { item.id = index + 1 })

            if (result.code === 0) {
                ElMessage({
                    message: '删除成功',
                    grouping: true,
                    type: 'success',
                })
            }
        }
        return { CaseLists, handleDelete }
    }
}
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