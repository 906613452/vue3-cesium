import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from "@/store/store";

// console.log('123123312')
// console.log(import.meta.env.VITE_API_HOST)
//引入echarts
import * as echarts from 'echarts';

const app = createApp(App);
app.config.globalProperties.$echarts = echarts;

app.use(store);
app.mount('#app')
