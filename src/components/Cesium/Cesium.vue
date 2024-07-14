<script setup lang="ts">
import { ref } from 'vue'
import * as Cesium from 'cesium';
// import './wall.js'
import { onMounted } from 'vue';
import moveTo from '../../assets/moveTo.png'
defineProps<{ msg: string }>()

// var baseImageProvider = new Cesium.UrlTemplateImageryProvider({
//   url: Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII/') + '{z}/{x}/{reverseY}.jpg',
//   tilingScheme: new Cesium.GeographicTilingScheme(),
//   maximumLevel: 2
// })
// var terrainProvider = new Cesium.CesiumTerrainProvider({
//   url: MapServerURL + 'mapSP/data/3d/dem'
// });
const baseViewer = ref()
var viewer = baseViewer.value

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkN2ZmZGY2NS1mOWRiLTRlZTgtODdkOC1lOWMzOGRmNWQ3MTQiLCJpZCI6MjI1MjQ1LCJpYXQiOjE3MTk1OTI4MTB9.elj99yg8hAHGa9vuhiXlVCeVukUF1_z4XXKol11hQrk'





// 设置初始视角
const setView = () => {
  viewer = new Cesium.Viewer('cesiumContainer', {
    terrain: Cesium.Terrain.fromWorldTerrain(),
    // // imageryProvider: baseImageProvider,
    // baseLayerPicker: false,
    // // terrainProvider: terrainProvider,
    // animation: false,
    // timeline: false,
    // homeButton: false,
    // geocoder: false,		//{url : MapServerURL}, proxy : new Cesium.BeyonDBProxy('/proxy/'), 
    // navigationHelpButton: false,
    // fullscreenButton: false,
    // layersButton: true,
    // scene3DOnly: true,
    // shadows: false,
    // terrainShadows: Cesium.ShadowMode.DISABLED,//Cesium.ShadowMode.CAST_ONLY 仅仅投影，Cesium.ShadowMode.DISABLED 不投影也不接受投影 Cesium.ShadowMode.ENABLED 投影接收投影 Cesium.ShadowMode.RECEIVE_ONLY只接受不投影
    // terrainShadows: false,
    // //   selectionIndicator: false,
    // infoBox: false,
    // contextOptions: { allowTextureFilterAnisotropic: false, webgl: { preserveDrawingBuffer: false } }
  });
  viewer.scene.globe.depthTestAgainstTerrain = true;
  viewer.scene.fog.density = 4.0e-5;

  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(118.682852, 32.03, 20000),	//106.7432561,22.08539346,1000.3245752),	
    orientation: {
      heading: Cesium.Math.toRadians(0.0),
      pitch: Cesium.Math.toRadians(-90.0),
      roll: 0
    },
    // duration: 4
  });
}

// 渐变透明电子围栏
const el = () => {
  //添加物体
  var redWall = viewer.entities.add({
    name: 'Red wall at height',
    wall: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights([
        121.444409, 31.247417, 200.0,
        121.533521, 31.235685, 200.0,
        121.563273, 31.190347, 200.0,
        121.546744, 31.194054, 200.0,
        121.516705, 31.191459, 200.0,
        121.502188, 31.203074, 200.0,
        121.444409, 31.247417, 200.0,
      ]),
      // minimumHeights: [3000.0, 2000.0, 2000, 2000, 2000, 3000,3000],
      maximumHeights: [500, 500, 500, 500, 500, 500, 500],
      minimumHeights: [0, 0, 0, 0, 0, 0, 0],
      material: new Cesium.ImageMaterialProperty({
        // image:"2.png",
        image: getColorRamp([0.0, 0.045, 0.1, 0.15, 0.37, 0.54, 1.0], true),
        transparent: true
      })
    }
  });

  //纹理图绘制
  function getColorRamp(elevationRamp) {
    var ramp = document.createElement('canvas');
    ramp.width = 1;
    ramp.height = 100;
    var ctx = ramp.getContext('2d');

    var values = elevationRamp;
    var grd = ctx.createLinearGradient(0, 0, 0, 100);
    var rgba = Cesium.Color.fromCssColorString('rgb(207,255,255)');

    grd.addColorStop(values[0], rgba.withAlpha(0).toCssColorString()); //black
    // grd.addColorStop(values[1], rgba.withAlpha(0.1).toCssColorString()); //blue
    // grd.addColorStop(values[2], rgba.withAlpha(0.2).toCssColorString()); //pink
    // grd.addColorStop(values[3], rgba.withAlpha(0.4).toCssColorString()); //red
    // grd.addColorStop(values[4], rgba.withAlpha(0.6).toCssColorString()); //orange
    grd.addColorStop(values[6], rgba.withAlpha(0.8).toCssColorString()); //yellow
    // grd.addColorStop(values[6], rgba.withAlpha(1.0).toCssColorString().replace(')',',1.0)')); //white

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 1, 100);
    return ramp;
  }

  // 飞行到围栏位置
  viewer.zoomTo(viewer.entities);
}


const activeEl = () => {
    let getCustomMaterialLine = () => {
      return new Cesium.DynamicWallMaterialProperty({
        trailImage: moveTo,
        color: 'f00',
        duration: 2000,
      });
    };


  var redWall = viewer.entities.add({
    name: 'Red wall at height',
    wall: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights([
        121.444409, 31.247417, 200.0,
        121.533521, 31.235685, 200.0,
        121.563273, 31.190347, 200.0,
        121.546744, 31.194054, 200.0,
        121.516705, 31.191459, 200.0,
        121.502188, 31.203074, 200.0,
        121.444409, 31.247417, 200.0,
      ]),
      // minimumHeights: [3000.0, 2000.0, 2000, 2000, 2000, 3000,3000],
      maximumHeights: [500, 500, 500, 500, 500, 500, 500],
      minimumHeights: [0, 0, 0, 0, 0, 0, 0],
      // material: new Cesium.ImageMaterialProperty({
      //   // image:"2.png",
      //   image: getColorRamp([0.0, 0.045, 0.1, 0.15, 0.37, 0.54, 1.0], true),
      //   transparent: true
      // })
      material: getCustomMaterialLine()
    }
  });


  viewer.zoomTo(viewer.entities);

}
// 点击获取经纬度
const getCoordinate = () => {
  var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  handler.setInputAction(function (click) {
    // 获取点击位置
    var pickedPosition = viewer.scene.pickPosition(click.position);
    if (Cesium.defined(pickedPosition)) {
      // 将笛卡尔坐标转换为地理坐标（经纬度）
      var cartographic = Cesium.Cartographic.fromCartesian(pickedPosition);
      var longitude = Cesium.Math.toDegrees(cartographic.longitude);
      var latitude = Cesium.Math.toDegrees(cartographic.latitude);
      var height = cartographic.height;

      // 输出坐标
      console.log('Longitude: ' + longitude + ', Latitude: ' + latitude + ', Height: ' + height);
      // alert('Longitude: ' + longitude + ', Latitude: ' + latitude + ', Height: ' + height);
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}



onMounted(() => {
  setView()
  // electronicFence()
  // el()
  // activeEl()
  getCoordinate()
})
</script>

<template>
  <div id="cesiumContainer"></div>
</template>

<style scoped>
#cesiumContainer {
  width: 100vw;
  height: 100vh;
}
</style>
