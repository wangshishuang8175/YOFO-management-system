/*
 * @Descripttion:
 * @version:
 * @Date: 2021-04-20 11:06:21
 * @LastEditors: huzhushan@126.com
 * @LastEditTime: 2021-07-26 14:37:08
 * @Author: huzhushan@126.com
 * @HomePage: https://huzhushan.gitee.io/vue3-element-admin
 * @Github: https://github.com/huzhushan/vue3-element-admin
 * @Donate: https://huzhushan.gitee.io/vue3-element-admin/donate/
 */
// home.js
const Layout = () =>
    import ('@/layout/index.vue')

export default [{
    path: '/exhibition',
    component: Layout,
    redirect: '/exhibition/imdex',
    name: 'exhibition',
    meta: {
        title: '展会信息',
    },
    icon: 'home',
    children: [{
            path: 'index',
            component: () =>
                import ('@/views/exhibition/index.vue'),
            name: 'exhibitionlist',
            meta: { title: '文章列表' },

        },
        {
            path: 'create',
            component: () =>
                import ('@/views/exhibition/create.vue'),
            name: 'createarticle',
            meta: { title: '新建文章' },

        }
    ],
}, ]

// export default [{
//     path: '/exhibition',
//     component: Layout,
//     name: 'test',
//     meta: {
//         title: '展会',
//     },
//     icon: 'el-icon-location',
//     children: [{
//         path: 'exhibition',
//         name: '展会',
//         component: Exhibition,
//         meta: {
//             title: '展会',
//             affix: true,
//         },
//     }, ],
// }, ]

// const Layout = () => import('@/layout/index.vue')

// export default [
//     {
//         path: '/article',
//         component: Layout,
//         redirect: '/article/list',
//         name: 'article',
//         meta: {
//             title: '金融文章'
//         },
//         icon: 'file-text',
//         children: [
//             {
//                 path: 'list',
//                 component: () => import('@/views/article/list.vue'),
//                 name: 'articlelist',
//                 meta: { title: '文章列表' },
//                 icon: 'eye'
//             },
//             {
//                 path: 'create',
//                 component: () => import('@/views/article/create.vue'),
//                 name: 'createarticle',
//                 meta: { title: '新建文章' },
//                 icon: 'form'
//             }
//         ]
//     },
// ]