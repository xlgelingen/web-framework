import './assets/css/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';

import ElementPlus from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import 'element-plus/dist/index.css';

import Antd from "ant-design-vue";
import 'ant-design-vue/dist/reset.css';

import 'virtual:svg-icons-register';
import SvgIcon from '@/components/common/iconSvg.vue';

const app = createApp(App);

app.use(createPinia());
app.use(router);

//国际化，切换使用语言为中文
app.use(ElementPlus, {
  locale: zhCn
});

app.use(Antd)

//全局注册组件，<svg-icon></svg-icon>
app.component('SvgIcon', SvgIcon);

app.mount('#app');
