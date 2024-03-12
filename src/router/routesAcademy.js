const Academy = () => import(/* webpackChunkName: "academy" */ '@/views/Academy/AcademyIndex.vue');

export default [
  {
    path: '/academy',
    name: 'Academy',
    component: Academy
  },
  {
    path: '/academy/course',
    name: 'AcademyCourse',
    component: Academy
  },
  {
    path: '/academy/camp',
    name: 'AcademyCamp',
    component: Academy
  },
];