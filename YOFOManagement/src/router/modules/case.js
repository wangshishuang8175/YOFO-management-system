/*
 * @Descripttion:
 * @version:
 * @Date: 2021-04-21 09:18:32
 * @LastEditors: huzhushan@126.com
 * @LastEditTime: 2021-07-26 16:30:58
 * @Author: huzhushan@126.com
 * @HomePage: https://huzhushan.gitee.io/vue3-element-admin
 * @Github: https://github.com/huzhushan/vue3-element-admin
 * @Donate: https://huzhushan.gitee.io/vue3-element-admin/donate/
 */
const Layout = () => import('@/layout/index.vue')
const CaseAdd = () => import('@/views/case/index.vue')
const CaseList = () => import('@/views/case/list.vue')

export default [{
    path: '/case',
    component: Layout,
    name: 'case',
    meta: {
        title: '案例',
    },
    icon: 'el-icon-location',
    children: [{
        path: 'add',
        name: 'caseAdd',
        component: CaseAdd,
        meta: {
            title: '新增案例',
        },
    }, {
        path: '',
        name: 'caseList',
        component: CaseList,
        meta: {
            title: '查看案例',
        },
    }, ],
}, ]