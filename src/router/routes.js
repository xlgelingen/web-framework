import BasicLayout from '@/components/layout/BasicLayout.vue';
import Home from '@/views/HomeIndex.vue';
import NotFound from '@/views/Common/NotFound.vue';
import routesAcademy from './routesAcademy';

export default [
  {
    path: '/',
    name: 'Root',
    component: BasicLayout,
    redirect: {
      name: 'Home'
    },
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      ...routesAcademy
    ]
  },
  {
    path: "/404",
    name: "NotFound",
    component: NotFound
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404'
  }
];