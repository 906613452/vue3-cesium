<script setup >
import { onMounted,watch,ref } from "vue";
import store from "@/store/store";
import * as Cesium from "cesium";
import ThroughRoad from './components/throughRoad.vue' ;
import Points from './components/points.vue' ;
import Wall from './components/wall.vue' ;

const isView = ref(false)

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkN2ZmZGY2NS1mOWRiLTRlZTgtODdkOC1lOWMzOGRmNWQ3MTQiLCJpZCI6MjI1MjQ1LCJpYXQiOjE3MTk1OTI4MTB9.elj99yg8hAHGa9vuhiXlVCeVukUF1_z4XXKol11hQrk'

onMounted(() => {
  init();
});
const init = () => {
  const viewer = new Cesium.Viewer("cesiumContainer", {
    // infoBox: false,
    navigationHelpButton: false,
		fullscreenButton: false,
    timeline: false, // 是否显示时间线控件
    imageryProvider: new Cesium.IonImageryProvider({ assetId: 3812 }), // Black Marble imagery layer
    // imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
    //   url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
    // }),
    baseLayerPicker: false,
    
    
    // terrainProvider: new Cesium.CesiumTerrainProvider({
    //   url: "http://data.marsgis.cn/terrain",
    // }),
    // terrain: Cesium.Terrain.fromWorldTerrain({
    //   requestVertexNormals: true, //Needed to visualize slope
    // }),
    // 3d地形
    // terrain: Cesium.Terrain.fromWorldTerrain(),
    // 指定上下文
    // contextOptions: {
    //   requestWebgl1: true,
    // },
    navigationHelpButton: false,  // 隐藏导航帮助按钮
    animation: false,             // 隐藏动画控件
    timeline: false,              // 隐藏时间轴
    fullscreenButton: false,      // 隐藏全屏按钮
    vrButton: false               // 隐藏VR按钮
  });
  viewer.scene.globe.depthTestAgainstTerrain = true;
  viewer.scene.globe.baseColor = Cesium.Color.fromCssColorString('#011634');
  // 不显示底图
  // viewer.imageryLayers.get(0).show = false;
  // 去除logo
  viewer.cesiumWidget.creditContainer.style.display = "none";
  // 显示帧率
  viewer.scene.debugShowFramesPerSecond = true;
  viewer.scene.globe.depthTestAgainstTerrain = true;
  store.commit("initViewer", viewer);
  // 外天空盒
  // viewer.scene.skyBox = new Cesium.SkyBox({
  //   sources: {
  //     positiveX: "/images/Standard-Cube-Map/px1.png",
  //     negativeX: "/images/Standard-Cube-Map/nx1.png",
  //     positiveY: "/images/Standard-Cube-Map/pz.png",
  //     negativeY: "/images/Standard-Cube-Map/nz1.png",
  //     positiveZ: "/images/Standard-Cube-Map/py.png",
  //     negativeZ: "/images/Standard-Cube-Map/ny1.png",
  //   },
  // });

  // 调试使用
  window.viewer = viewer;

  // 监听点击事件，拾取坐标
  const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  handler.setInputAction((e) => {
    const clickPosition = viewer.scene.camera.pickEllipsoid(e.position);
    const randiansPos = Cesium.Cartographic.fromCartesian(clickPosition);
    console.log(
      "经度：" +
      Cesium.Math.toDegrees(randiansPos.longitude) +
      ", 纬度：" +
      Cesium.Math.toDegrees(randiansPos.latitude)
    );
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
};
watch(()=> store.state.viewer, (newValue, oldValue) =>{
  console.log(newValue)
  if(newValue) {
    isView.value = true
  }
})
</script>

<template>
  <div id="cesiumContainer"></div>
  <ThroughRoad v-if="isView"></ThroughRoad>
  <Points v-if="isView"></Points>
  <Wall v-if="isView"></Wall>
</template>

<style scoped>
#cesiumContainer {
  width: 100vw;
  height: 100vh;
}
</style>