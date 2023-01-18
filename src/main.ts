/*
 * @Author: June
 * @Description:
 * @Date: 2023-01-17 12:46:35
 * @LastEditors: June
 * @LastEditTime: 2023-01-18 16:04:55
 */
import { createApp } from 'vue';
import store from '@/store';
import router from '@/router';
import App from './App.vue';
import '@/styles/index.scss';
import '@/styles/element/index.css';

// 解决api调用样式问题
import 'element-plus/theme-chalk/el-message.css';
import 'element-plus/theme-chalk/el-notification.css';

function bootStrap() {
    const app = createApp(App);
    app.use(store);
    app.use(router);
    app.mount('#app');
}

bootStrap();