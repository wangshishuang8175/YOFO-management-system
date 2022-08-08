
// home.js
const Layout = () => import('@/layout/index.vue')
const Contact = () => import('@/views/contact/index.vue')

export default [
  {
    path: '/contact',
    component: Layout,
    name: 'ContactMe',
    meta: {
      title: '讯息管理',
    },
    icon: 'form',
    children: [
      {
        path: '',
        name: 'contact',
        component: Contact,
        meta: {
          title: '讯息管理',
        //   affix: true, 不能点小x删除，固定住
        },
      },
    ],
  },
]
