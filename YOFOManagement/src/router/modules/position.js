const PeopleIndex = () => import("@/views/position/index.vue");
//  const CreatePosition = () => import("@/views/position/createposition.vue");
//  const EditPosition=()=>import("@/views/position/edit.vue");
const Layout = () => import("@/layout/index.vue");

export default [
    {
      path: "/position",
      //layout组件不是必须的，像一些登录、错误信息页面，就不需要layout组件。
      component: Layout,
      name: "position",
      meta: {
        title: "职位管理",
      },
      icon: "user",
      //子路由
      children: [
        {
          path: "index",
          name: "PeopleIndex",
          component: PeopleIndex,
          meta: {
            title: "职位首页",
          },
        }
        // {
        //   path: "createposition",
        //   name: "CreatePosition",
        //   component:CreatePosition ,
        //   meta: {
        //     title: "职位发布",
        //   },
        // },
        // {
        //   path: "editposition",
        //   name: "EditPosition",
        //   component:EditPosition,
        //   meta: {
        //     title: "职位编辑",
        //   },
        // }
      ],
    },
  ];