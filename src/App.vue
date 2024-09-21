<script setup lang="ts">
import Cesium from './pages/cesium/cesium.vue'
import Leaflet from './pages/leaflet/leaflet.vue'
import XiangshuiMap from './pages/leaflet/xiangshuiMap.vue'
import Header from './pages/header/header.vue'
import Left from './pages/left/left.vue'
import Right from './pages/right/right.vue'
import { getCurrentInstance } from 'vue';
// const instance = getCurrentInstance();
// const router = instance.appContext.config.globalProperties.$router;
// console.log(router)
// const currentRoute = router.currentRoute.value; // 当前页面的路由对象

import { useRoute } from 'vue-router';
 
const currentRoute = useRoute(); // 当前页面的路由对象
console.log(currentRoute)

</script>

<template>
  <!-- <Header />
  <Left />
  <Right /> -->
  <!-- <Leaflet></Leaflet> -->
  <!-- <Cesium /> -->
  <!-- <XiangshuiMap></XiangshuiMap> -->
   <router-view></router-view>
</template>

<style scoped>

</style>
