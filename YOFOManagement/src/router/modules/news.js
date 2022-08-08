const NewsIndex = () => import("@/views/news/index.vue");
const NewsCreate = () => import("@/views/news/createnews.vue");
const Layout = () => import("@/layout/index.vue");

export default [
    {
      path: "/news",
      //layout组件不是必须的，像一些登录、错误信息页面，就不需要layout组件。
      component: Layout,
      name: "news",
      meta: {
        title: "新闻管理",
      },
      icon: "xinwen",
      //子路由
      children: [
        {
          // 子路由不可少，path为空为点击默认打开的右侧内容模块
          path: "",
          name: "NewsIndex",
          component: NewsIndex,
          meta: {
            title: "新闻动态",
          },
        },
        {
          path: "creatnews",
          name: "NewsCreate",
          component: NewsCreate,
          meta: {
            title: "撰写新闻",
          },
        },
      ],
    },
  ];