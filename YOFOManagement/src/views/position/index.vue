
<template>
  <div class="wrap">
    <div class="common-layout">
      <el-container>
        <el-header class="header">
          <div class="top-bar">
            <div class="left">
              <a href="/">
                <img src="../../assets/img/yofo.logo.png" />
              </a>
            </div>

            <div class="mid">
              <ul class="menu-container">
                <!-- 隐藏菜单 -->
                <li class="CT">
                  <a href="#" class="top"> 口腔颌面CT</a>
                  <div class="menu-inner">
                    <ul class="text-left">
                      <li class="list1">
                        <h5 class="product">产品</h5>
                        <a href="#" class="left">
                          <img class="bigimgleft" src="../../assets/img/pirox.png" />
                          <div class="wenzi">
                            <h6 class="pirox">PIROX</h6>
                            <p class="prks">派若克斯</p>
                            <p class="cbt">全球首款双源大视野CBCT</p>
                          </div>
                        </a>
                      </li>

                      <li class="list2">
                        <h5 class="mb15 ft16">软件</h5>
                        <a href="/dubhewer" class="clearfix bg-gray full-sub-menu__inner2 mb10 pd10">
                          <img class="minimg left mr10" src="../../assets/img/dubhewer.svg" />
                          <div class="wenz1">
                            <h6 class="ft16 ft-bold mb5 line10 over-doit">
                              Dubhewer
                            </h6>
                            <p class="ft-gray over-doit">CBCT图像管理软件</p>
                          </div>
                        </a>
                        <a href="/autodon" class="clearfix bg-gray full-sub-menu__inner2 mb10 pd10">
                          <img class="minimg left mr10" src="../../assets/img/autodon.svg" />
                          <div class="wenz1">
                            <h6 class="autodon">Autodon</h6>
                            <p class="teeth">齿科正畸软件</p>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a href="#" class="top">技术与创新</a>
                </li>
                <li>
                  <a href="#" class="top">
                    临床案例
                  </a>
                </li>
                <li class="about">
                  <a href="#"> 关于有方</a>
                  <dl class="dl1">
                    <dd>企业简介</dd>
                    <dd>发展历程</dd>
                    <dd>资质与荣誉</dd>
                    <dd>联系我们</dd>
                    <dd>加入有方</dd>
                  </dl>
                </li>
                <li class="news">
                  <a href="#">资讯中心</a>
                  <dl class="dl2">
                    <dd>新闻动态</dd>
                    <dd>展会信息</dd>

                  </dl>
                </li>
                <li>
                  <a href="#" class="top">服务与支持</a>
                </li>
              </ul>
            </div>
            <div class="right">
              <img src="../../assets/img/contact.png" />
              <a>联系我们</a>
            </div>
          </div>
          <div class="image">
            <div class="wen">
              <h3>加入有方</h3>
              <p>在这里,成就更好的自己！</p>
            </div>
          </div>
          <div class="page-menus">
            <li class="jj">企业简介</li>
            <li>发展历程</li>
            <li>资质荣誉</li>
            <li>联系我们</li>
            <li class="join">加入有方</li>
          </div>
        </el-header>
        <el-container>
          <!-- <el-aside class="aside">
            <h6>职位筛选</h6>
            <p>职位类别</p>
           <div>
             <ul class="position">
              <li class="l1">全部职位</li>
              <li>其他类</li>
              <li>市场类</li>
              <li>研发类</li>
              <li>行政类</li>
              <li>设计类</li>
              <li>销售类</li>
            </ul>
           </div>
            <div>
              <p class="suo">所在城市</p>
            <ul class="city">
            <li>东菀市</li>
            <li>合肥市</li>
            </ul>
            </div>
          </el-aside> -->
          <el-container>
            <el-main class="main">
              <h3>有方医疗职位招聘</h3>
              <el-button type="primary" @click="handleExportExcel" style="margin-bottom:20px">导出excel文件 <i
                  class="el-icon-search"></i> </el-button>
              <el-table :data="positionList" stripe style="width:100%">
                <el-table-column align="center" prop="id" label="编号" width="80"> </el-table-column>
                <el-table-column align="center" prop="title1" label="职位" width="200"> </el-table-column>
                <el-table-column align="center" prop="description1" label="岗位描述" width="200"
                  :show-overflow-tooltip="true"> </el-table-column>
                <el-table-column align="center" prop="description2" label="职位要求" width="200"
                  :show-overflow-tooltip="true"> </el-table-column>
                <el-table-column align="center" prop="email" label="邮件地址" width="180" class="ellipsis">
                </el-table-column>
                <el-table-column label="预览图" width="240" header-align="center">
                  <template #default="scope">
                    <el-image style="width: 240px; height: 120px; object-fit: cover;" :src="scope.row.img"
                      :preview-src-list="[scope.row.img]">
                    </el-image>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="100" header-align="center">
                  <template #default="scope">
                    <el-button align="center" size="mini" width="100" type="danger"
                      @click="handleDelete(scope.$index, scope.row), commit('position/redNum')">
                      Delete
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div style="text-align: center; margin-top: 30px;">
                <el-pagination layout="prev, pager, next" :total="total" :page-size="size" :current-page="current"
                  @current-change="handleCurrentChange" />
              </div>

              <div class="createPost-container">
                <h3>有方医疗职位发布</h3>
                <el-form ref="postFormRef" :model="postForm" :rules="rules" class="form-container">
                  <el-row>
                    <el-col>
                      <el-form-item label-width="60px" style="margin-bottom: 40px" label="标题"
                        class="postInfo-container-item" prop="title1">
                        <el-input el-input name="title1" required v-model="postForm.title1">

                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="18">
                      <el-form-item label-width="100px" label="岗位描述" class="postInfo-container-item"
                        prop="description1">
                        <el-input name="description1" required v-model="postForm.description1" />
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
                  <el-form-item prop="description2" style="margin-bottom: 30px">
                    <RichEditor :model-value="postForm.description2" @update:modelValue="handleUpdateValue">
                    </RichEditor>
                  </el-form-item>

                </el-form>
              </div>




            </el-main>
          </el-container>
        </el-container>
        <el-footer class="footer">
          <div class="left">
            <img src="../../assets/img/logo2.svg" alt="">
          </div>
          <div class="mid">
            <ul>
              <li class="L1">
                <h3>口腔颌面CT</h3>
                <a href="#">PIROX</a>
                <a href="#">Dubhewer</a>
                <a href="#">Autodon</a>
              </li>
              <li>
                <h3>技术与创新</h3>
                <a href="#">技术与创新</a>
              </li>
              <li>
                <h3>临床案例</h3>
                <a href="#">临床案例</a>
              </li>
              <li>
                <h3>关于有方</h3>
                <a>企业简介</a>
                <a>发展历程</a>
                <a>荣誉与资质</a>
                <a>联系我们</a>
                <a>加入有方</a>
              </li>
              <li>
                <h3>资讯中心</h3>
                <a>新闻动态</a>
                <a>展会信息</a>
              </li>
              <li>
                <h3>服务与支持</h3>
                <a>服务与支持</a>
              </li>
            </ul>
          </div>
          <div class="right">
            <h3>微信公众号</h3>
            <img src="../../assets/img/qr.png" alt="">
          </div>
          <div class="foot">
            <p class="p1">© 皖ICP备17020699号-1 有方医疗 All Rights Reserved. 版权所有：有方医疗</p>
            <p class="p2">
              <img src="../../assets/img/地球.png" alt="">
              语言：简体中文
            </p>
          </div>
        </el-footer>
      </el-container>
    </div>
  </div>
</template>
<script>
import RichEditor from '@/components/Editor/richEditor.vue'
import { defineComponent, computed, reactive, ref, toRefs } from 'vue'
import { useStore } from "vuex";
import { fetchPosition, deletePosition } from '@/api/position'
import { createPosition } from '@/api/position'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'position',
  components: {
    RichEditor
  },
  setup() {
    const router = useRouter();
    const { state, getters, dispatch, commit } = useStore();
    const positionList = ref([]);
    //分页属性
    const pageOptions = reactive({
      size: 3,
      current: 1,
      total: 99,
      handleCurrentChange: (current) => {
        pageOptions.current = current;
        fetchList();
      }
    })
    //数据展示
    const fetchList = async () => {
      let result = await fetchPosition({ current: pageOptions.current, size: pageOptions.size });
      console.log(result);
      + result.code === 200 ? positionList.value = result.data : "";
      + result.code === 200 ? pageOptions.total = result.total : "";
    }
    fetchList();

    const handleDelete = async (index, row) => {
      console.log(index, row)
      await deletePosition(row.id)
      await fetchList()
    }

    const tableColumn = [
      {
        prop: 'id',
        fixed: true,
        width: '150',
        label: '编号'
      },
      {
        prop: 'title1',
        fixed: false,
        width: '120',
        label: '职位'
      },
      {
        prop: 'description1',
        fixed: false,
        width: '120',
        label: '岗位描述'
      },
      {
        prop: 'description2',
        fixed: false,
        width: '120',
        label: '职位要求'
      },
      {
        prop: 'email',
        fixed: false,
        width: '120',
        label: '邮件地址'
      }

    ]

    const formatJson = (filterVal, jsonData) => jsonData.map((v) => filterVal.map((j) => v[j]))
    const filterArrayProp = (arrayObj, prop) => {
      console.log(arrayObj)
      const tempArray = []
      for (let i = 0; i < arrayObj.length; i++) {
        tempArray.push(arrayObj[i][prop])
      }
      return tempArray
    }
    const handleExportExcel = () => {
      import('./useExportExcel').then((excel) => {
        const table = positionList
        const tHeader = filterArrayProp(tableColumn, 'label')
        const filterVal = filterArrayProp(tableColumn, 'prop')
        const data = formatJson(filterVal, table.value)
        console.log(data)
        excel.exportJsonToExcel({
          multiHeader: [],
          merges: [],
          header: tHeader,
          data,
          filename: "position",
          autoWidth: true,
          bookType: "xlsx"
        })
      })
    }
    //post
    const postFormRef = ref(null)
    const postForm = reactive({
      id: '',
      title1: '',
      description1: '',
      description2: '',
      email: 'hr@yofomedical.com',
      img: 'https://www.yofomedical.com/wp-content/themes/yofo/images/c3b3d6bf5046c02b4888-min.jpg'

    })

    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }

    const rules = reactive({
      title1: [{ validator: validateRequire }],
      description1: [{ validator: validateRequire }],
      description2: [{ validator: validateRequire }],
    })

    const submitForm = () => {
      postFormRef.value.validate(async (valid) => {
        // console.log(valid,"xxxxxxxxxxxxxxx")
        if (valid) {
          // console.log(postForm);
          postForm.id = Math.floor(Math.random() * 1000) + 100;
          await createPosition(postForm)
          //提示
          ElNotification.success({
            title: '成功',
            message: '发布文章成功',
            type: 'success',
            duration: 2000,
          })
          postFormRef.value.resetFields()//清空
          //           setTimeout(()=>{
          //  router.push("/list")
          //           },500)

        }
      })
    }

    const handleUpdateValue = (val) => {
      // console.log(val)
      // richHtml.value=val;
      postForm.description2 = val;
    }
    //
    return {
      positionList, ...toRefs(pageOptions), handleDelete,
      postForm, rules, postFormRef, submitForm, handleUpdateValue,
      handleExportExcel,
      state,
      getters,
      dispatch,
      commit
    }
  }
})
</script>

<style lang="scss" scoped>
.common-layout {
  margin-left: -16px;
  margin-top: -16px;

  .header {
    width: 1423px;
    height: 560px;
    background-color: green;
    padding: 0px;

    .top-bar {
      margin-top: 0;
      height: 80px;
      background-color: #fff;

      img {
        width: 106px;
        height: 28px;
        margin-top: 20px;
        padding-left: 20px;
        // max-width: 100%;
      }

      .mid {
        // width:720px;
        height: 80px;
        margin-left: 240px;

        .menu-inner {
          width: 1423px;
          height: 276px;
          display: inline-block;
          display: none;
          background: #fff;

          left: -256px;
          position: relative;
          // right: 0px;
          top: 39px;
          z-index: 100;

          ul {

            .list1 {
              margin-left: 246px;
              width: 368px;
              height: 201px;

              h5 {
                font-weight: 400;
                color: black;

              }

              a {
                margin-top: 12px;
                background: #f9f9f9;
                display: flex;

                .bigimgleft {
                  width: 162px;
                  height: 162px;
                  flex: 1;
                  margin-top: 0px;
                  padding-bottom: 3px;
                }

                .wenzi {
                  flex: 2;
                  margin-top: 20px;

                  .pirox {
                    color: #050827;
                    font-weight: 700;
                    font-size: 20px;
                    margin-bottom: 8px;
                  }

                  p {
                    padding-right: 40px;
                    color: #999;
                    font-size: 12px;
                    font-weight: 400;
                  }
                }
              }
            }

            .list2 {

              h5 {
                font-weight: 400;
                color: black;

              }

              a {
                margin-top: 12px;
                background: #f9f9f9;
                display: flex;
                width: 270px;
                height: 76px;
                margin-bottom: 10px;

                img {
                  flex: 1;
                  width: 56px;
                  height: 56px;
                  margin-left: -10px;
                  margin-top: 8px;
                }

                // }
                .wenz1 {
                  flex: 2;
                  margin-top: 10px;

                  h6 {
                    color: #050827;
                    font-weight: 600;
                  }

                  p {
                    color: #999;
                    font-size: 12px;
                    font-weight: 400;
                  }
                }

                //         .wenz2{
                // width:270px;
                // height:76px;
                //         }
              }
            }

            // 
          }
        }

        .CT:hover {

          &:after {
            /* 必须设置 content 属性才能生效 */
            content: '';
            /* border 宽度 */
            width: 22px;
            /* border 高度 */
            height: 2px;
            background-color: blue;
            /* border 位置 absolute(绝对定位) */
            position: absolute;
            left: 38px;
            top: 48px;
          }

          .menu-inner {
            display: block;
            border-top: 1px solid #f9f9f9;
          }
        }

        .about {
          a {
            color: rgb(5, 8, 39);
          }
        }

        .news {
          a {
            color: rgb(5, 8, 39);
          }
        }

        .about:hover {
          a {
            color: #095bfb;
            text-decoration: none;
          }

          &:after {
            /* 必须设置 content 属性才能生效 */
            content: '';
            /* border 宽度 */
            width: 22px;
            /* border 高度 */
            height: 2px;
            background-color: blue;
            /* border 位置 absolute(绝对定位) */
            position: absolute;
            left: 38px;
            top: 48px;
          }

          .dl1 {
            display: block;

          }
        }

        .news:hover {
          a {
            color: #095bfb;
            text-decoration: none;
          }

          &:after {
            /* 必须设置 content 属性才能生效 */
            content: '';
            /* border 宽度 */
            width: 22px;
            /* border 高度 */
            height: 2px;
            background-color: blue;
            /* border 位置 absolute(绝对定位) */
            position: absolute;
            left: 38px;
            top: 48px;
          }

          .dl2 {
            display: block;
          }
        }

        .menu-container {

          // overflow:hidden;
          li {
            width: 118px;
            // height:80px;
            float: left;
            position: relative;
            z-index: 999;
            font-size: 16px;
            font-weight: 700;

            padding: 0 16px;
            margin-top: 20px;

            // a{ color:#095bfb;}
            a {
              color: rgb(5, 8, 39);
            }

            .top:hover {
              color: #095bfb;
              text-decoration: none;

              &:after {
                /* 必须设置 content 属性才能生效 */
                content: '';
                /* border 宽度 */
                width: 22px;
                /* border 高度 */
                height: 2px;
                background-color: blue;
                /* border 位置 absolute(绝对定位) */
                position: absolute;
                left: 38px;
                top: 48px;
              }

            }

            .dl1 {
              width: 150px;
              height: 290px;
              background-color: #fff;
              display: none;
              margin-top: 39px;
              margin-left: -30px;

              dd {
                font-size: 16px;
                font-weight: 400;
                margin: 10px auto;
                height: 50px;
                line-height: 50px;
                padding-left: 40px;
              }

              dd:hover {
                color: #095BFB;
                font-weight: 700;
                cursor: pointer;
                background-color: #f9f9f9;
              }

              // dd
            }

            // }
            .dl2 {
              width: 150px;
              height: 110px;
              background-color: #fff;
              display: none;
              margin-top: 39px;
              margin-left: -30px;

              dd {
                font-size: 16px;
                font-weight: 400;
                margin: 10px auto;
                height: 50px;
                line-height: 50px;
                padding-left: 40px;
              }

              dd:hover {
                color: #095BFB;
                font-weight: 700;
                cursor: pointer;
                background-color: #f9f9f9;
              }
            }
          }

        }
      }

      .right {
        margin-top: -80px;

        img {
          width: 18px;
          height: 14px;
          padding-top: 4px;
        }

        a {
          font-size: 16px;
          font-weight: 700;
          color: rgb(5, 8, 39);
          margin-left: 4px;
        }
      }
    }

    .image {
      width: 100%;
      height: 422px;
      background: url(../../assets/img/bcg.jpg) no-repeat;
      background-position: center top;

      .wen {
        width: 500px;
        height: 200px;
      }

      h3 {
        font-size: 48px;
        font-weight: 700;
        color: rgb(255, 255, 255);
        padding-top: 120px;
        padding-left: 100px;
        //            position: relative;
        // top: 120px;
        // left:100px;
        //  width:200px;
        //  height:80px;
      }

      p {
        opacity: 0.6;
        font-size: 18px;
        color: rgb(255, 255, 255);
        padding-left: 100px;
        padding-top: 10px;
        //             position: relative;
        //             top: 10px;
        // left:100px;
        //    width:220px;
        //  height:50px;
      }
    }

    .page-menus {
      // opacity: .5;
      height: 58px;
      display: flex;
      background-color: rgba(255, 255, 255, 1);

      li {
        // flex:1;
        color: rgb(102, 102, 102);
        font-size: 16px;
        line-height: 56px;
        padding-left: 1.6rem;
        padding-right: 1.6rem;
      }

      .jj {
        padding-left: 120px;
      }

      .join {
        color: rgb(34, 34, 34);
        font-weight: 700;
        border-bottom: 2px solid blue;
      }
    }
  }

  .aside {
    background: rgb(255, 255, 255);
    width: 270px;
    height: 430px;
    margin-top: 40px;
    margin-left: 50px;

    h6 {
      font-size: 20px;
      font-weight: 700;
      color: black;
      margin-left: 20px;
      margin-top: 30px;
    }

    p {
      font-size: 14px;
      font-weight: 700;
      margin-left: 20px;
      margin-top: 30px;
    }

    .position {

      .l1 {
        // float: left;
        width: 220px;
        // margin: 10px auto;
        margin-left: 20px;
      }

      li {
        float: left;
        // overflow: hidden;
        border: 1px solid rgba(0, 0, 0, .3);
        border-radius: 32px;
        color: rgba(0, 0, 0, .3);
        display: block;
        width: 100px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        margin-left: 20px;
        margin-top: 4px;
      }
    }

    .suo {
      position: relative;
      top: 20px;
      // left:-100px
      width: 100px;
      height: 30px;

    }

    .city {
      li {
        border: 1px solid rgba(0, 0, 0, .3);
        border-radius: 32px;
        color: rgba(0, 0, 0, .3);
        display: block;
        width: 100px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        margin-left: 20px;
        margin-top: 4px;
        float: left;
        margin-top: 60px;
      }
    }
  }

  .main {
    width: 906px;
    height: 1530px;
    // background-color: bisque;
    margin-top: 40px;
    margin-left: 25px;

    h3 {
      font-size: 30px;
      text-align: center;
      font-weight: 800;
      color: #095BFB;
      padding-bottom: 18px;
      padding-top: 30px;
    }

    .ellipsis {
      display: -webkit-box;
      text-overflow: ellipsis;
      overflow: hidden;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }

  .footer {
    width: 1423px;
    height: 489px;
    background: rgb(38, 38, 38);
    color: rgb(255, 255, 255);

    .left {
      img {
        margin-top: 70px;
        margin-left: 50px;
      }
    }

    .mid {
      ul {
        display: flex;

        h3 {
          font-size: 16px;
          font-weight: 700;
          color: rgb(255, 255, 255);
        }

        .L1 {
          padding-left: 70px;
        }

        li {
          // flex:1;
          margin-top: 70px;
          margin-left: 60px;

          a {
            display: block;
            color: #fff;
            opacity: .8;
            font-size: 14px;
            margin-top: 20px;
          }

          a:hover {
            color: #2362f6;
          }
        }
      }
    }

    // }
    .right {
      margin-top: -214px;
      position: relative;
      left: -180px;

      img {
        width: 80px;
        height: 80px;
        margin-top: 15px;
      }

      h3 {
        font-size: 16px;
        font-weight: 700;
        color: rgb(255, 255, 255);

      }
    }
  }

  .foot {
    border-top: 1px solid lightgray;
    margin-top: 80px;
    color: #fff;
    font-size: 14px;
    opacity: .8;

    p {
      margin-top: 12px;
    }

    .p1 {
      float: left;
    }

    .p2 {
      float: right;
    }

    img {
      width: 20px;
      height: 20px;
      position: relative;
      top: 6px
    }
  }


}
</style>


