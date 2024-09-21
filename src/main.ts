import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from "@/store/store";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
// console.log('123123312')
// console.log(import.meta.env.VITE_API_HOST)
//引入echarts
import * as echarts from 'echarts';

const app = createApp(App);
app.config.globalProperties.$echarts = echarts;

app.use(router)  
app.use(store);
app.use(ElementPlus)
app.mount('#app')
