import { createRouter, createWebHistory } from 'vue-router';
import cookies from 'js-cookie';
import routes from './routes';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css' // nprogress样式

import userService from '@/services/user';
import { useStore } from '@/stores/index.js';

const TOKEN_KEY = 'web_token';
const appRouter = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  //全局的滚动行为 scrollBehavior，用于控制页面切换时的滚动位置
  scrollBehavior(to, from, savedPosition) {
    // `to` 和 `from` 都是路由路径
    // `savedPosition` 如果不存在可以为 null
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  }
});

// 只触发一次的锁
//添加了一个名为 firstInit 的属性，用于标记应用程序是否已经初始化过
appRouter.firstInit = false;

//beforeEach 导航守卫，用于在每次路由切换之前执行一些逻辑
appRouter.beforeEach(async (to, from, next) => {
  //启动了进度条 NProgress.start()；以提示用户当前页面正在加载中。
  NProgress.start();

  //设置了页面的标题，根据路由元信息中的 title 字段
  if (to.meta.nav?.title) document.title = to.meta.nav.title;

  const store = useStore();
  const token = cookies.get(TOKEN_KEY);

  // 有 TOKEN 的情况下只请求一次用户信息
  /* 如果存在 token 并且尚未初始化过用户信息（appRouter.firstInit 为 false），
  则尝试获取用户信息，并保存到 Vuex 的状态管理中 */
  if (token && !appRouter.firstInit) {
    try {
      const userInfo = await userService.getUserInfo();
      store.setUserInfo(userInfo);
      appRouter.firstInit = true;
    } catch (e) {
      next();
    }
  }

  //如果用户尚未登录且当前路由需要进行权限验证（to.meta.auth 为 true），则跳转到首页；
  if (!store.userInfo?.id && to.meta.auth) {
    next({ name: 'Home' });
    return;
  }
  next();
});

//使用了 afterEach 后置钩子，在路由导航完成后执行一些逻辑。这里用于结束进度条
// eslint-disable-next-line
appRouter.afterEach((to, from) => {
  //结束进度条
  NProgress.done();
});

export default appRouter;
