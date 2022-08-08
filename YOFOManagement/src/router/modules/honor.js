const Layout = () =>
    import ('@/layout/index.vue')
const HonorIndex = () =>
    import ('@/views/honor/index.vue')
const HonorList = () =>
    import ('@/views/honor/list.vue')

export default [{
    path: '/honor',
    component: Layout,
    name: 'Honor',
    meta: {
        title: '荣誉管理',
    },
    icon: 'home',
    children: [{
            path: '',
            name: 'HonorIndex',
            // component: HonorIndex,
            component: () =>
                import ('@/views/honor/index.vue'),
            meta: {
                title: '荣誉首页',
                affix: false,
            },
            icon: 'honor',
        },

        {
            path: 'list',
            name: 'HonorList',
            // component: HonorList,
            component: () =>
                import ('@/views/honor/list.vue'),
            meta: {
                title: '新建荣誉',
                affix: false,
            },
            icon: 'files',
        },
    ],
}, ]