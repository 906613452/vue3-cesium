<!--
 * @Description: 
 * @Author: 笙痞77
 * @Date: 2023-01-11 13:39:25
 * @LastEditors: 笙痞77
 * @LastEditTime: 2024-06-22 21:33:21
-->
<script setup lang="ts">
import * as Cesium from "cesium";
import { useApi } from '../../../api/api'

import { useStore } from "vuex";
import { onBeforeMount, onMounted, onUnmounted, ref } from "vue";
import RoadThroughLine from "@/utils/roadThrough.js";
import jsonUrl from '@/assets/json/qingdaoRoadGEO.json'
import spriteline from '@/assets/images/spriteline.png'

// import { getGeojson } from "@/common/api/api.js";
// import modifyMap from "@/utils/cesiumCtrl/modifyMap.js";
// const props = defineProps<{
//     viewer: any;
// }>()
// console.log(props.viewer)

const store = useStore();
// const api = useApi()

const { viewer } = store.state;
const material = new RoadThroughLine(3000, spriteline);

onMounted(() => {

//   viewer.scene.terrainProvider = new Cesium.EllipsoidTerrainProvider({});
//   modifyMap(viewer);
// setTimeout(()=>{
    onStartEntity()

// },2000)
});

// viewer.camera.setView({
//   // 从以度为单位的经度和纬度值返回笛卡尔3位置。
//   destination: Cesium.Cartesian3.fromDegrees(120.188, 36.67, 200000),
// });
viewer.camera.setView({
  destination: Cesium.Cartesian3.fromDegrees(120.45356908944257, 36.10187409371475, 18000),
  orientation : {
	heading : Cesium.Math.toRadians(1.0),
	pitch : Cesium.Math.toRadians(-30.0),
	roll : 0
},
});

let _dataSource = null;
const onStartEntity = () => {
  // 道路闪烁线
  _dataSource = new Cesium.GeoJsonDataSource();
  _dataSource.load(jsonUrl,{
    clampToGround: true // 使 GeoJSON 数据与地形贴合
  }).then(function (dataSource) {

    const entities = dataSource.entities.values;
    // 聚焦
    // viewer.zoomTo(entities);
    for (let i = 0; i < entities.length; i++) {
      let entity = entities[i];
      entity.polyline.width = 1.7;
      entity.polyline.material = material;
    }
  });
  viewer.dataSources.add(_dataSource);
};


// onUnmounted(() => {
//   onClear();
//   viewer.scene.terrainProvider = new Cesium.CesiumTerrainProvider({
//     url: "http://data.marsgis.cn/terrain",
//   });
// });
</script>
<template>
  <!-- <operate-box>
    <el-button type="primary" @click="onStartEntity"
      >开始(entity渲染)</el-button
    >
    <el-button type="primary" @click="onStartPimitive"
      >开始(primitive渲染)</el-button
    >
    <el-button type="primary" @click="onClear">清除</el-button>
  </operate-box> -->
</template>
