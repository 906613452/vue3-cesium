<script setup lang="ts">
import Cesium from './pages/cesium/cesium.vue'
import Leaflet from './pages/leaflet/leaflet.vue'
import Header from './pages/header/header.vue'
import Left from './pages/left/left.vue'
import Right from './pages/right/right.vue'
</script>

<template>
  <Header />
  <Left />
  <Right />
  <Leaflet></Leaflet>
  <!-- <Cesium /> -->
</template>

<style scoped>

</style>
