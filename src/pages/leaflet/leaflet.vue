<script setup>
import { onMounted, watch, ref } from "vue";
// import L from "leaflet";
import * as L from "leaflet";
import "@/assets/js/Leaflet.InternetMapCorrection.js";
import { useApi } from '@/api/api'
import camera from '@/assets/images/camera.svg'
import covid from '@/assets/images/covid.svg'
import grow from '@/assets/images/grow.svg'
import met from '@/assets/images/met.svg'
import soil from '@/assets/images/soil.svg'

import chayang from '@/assets/images/leiwo_chayang.svg'
import shuidao from '@/assets/images/leiwo_shuidao.svg'
import tuola from '@/assets/images/leiwo_tuola.svg'


import EZUIKitJsVideo from './EZUIKitJsVideo.vue'


const isView = ref(false)

const leafletMapBox = ref(null);
const api = useApi()
const map = ref()
const urlId = ref()
const farmMachines = ref([
  {
    accArea: 300,
    accWorkTime: 3,
    city: "320300",
    companyCode: "LW",
    companyName: "雷沃",
    county: "320305",
    farmBasisId: "1681495753541095426",
    farmBasisName: "徐州睢宁金城智慧农业平台",
    id: 5,
    lat: "33.91952169",
    lon: "117.85867065",
    machineryId: "21409845",
    machineryNumber: "63321YA61M3300181",
    machinerySort: 0,
    machineryType: "插秧机",
    phone: "18915215863",
    positionTime: "2023-09-14T10:38:45",
    province: "320000",
    remarks: "1",
    state: "1",
    tid: null,
    town: "1",
    userName: "邱胡"
  },
])

const camerasList = ref([
  {
    lat: 33.92339370651733,
    lng: 117.87447094917299,
    companyName: "default",
    machineryType: "植物生长记录仪",
    type: 'grow'
  },
  {
    lat: 33.921568649507755,
    lng: 117.87549018859865,
    companyName: "default",
    machineryType: "植物生长记录仪",
    type: 'grow'

  },
  {
    lat: 33.92285954753713,
    lng: 117.87452459335329,
    companyName: "default",
    machineryType: "病害识别摄像头",
    machineryNumber: "SSAM-577291-DAFBD",
    type: 'grow'

  },
  {
    lat: 33.92149742697816,
    lng: 117.87492156028749,
    companyName: "default",
    machineryType: "病害识别摄像头",
    machineryNumber: "SSAM-577267-ABACF",
    type: 'grow'

  },
  {
    lat: 33.92342041437843,
    lng: 117.8760588169098,
    companyName: "default",
    machineryType: "墒情监测仪",
    type: 'grow'

  },
  {
    lat: 33.92231203110654,
    lng: 117.8761124610901,
    companyName: "default",
    machineryType: "墒情监测仪",
    type: 'grow',

  },
  {
    type: 'grow',
    lat: 33.92370529770908,
    lng: 117.87615001201631,
    companyName: "default",
    machineryType: "气象站",
    machineryNumber: "40300536",
  },
  {
    type: 'grow',
    lat: 33.92217403860544,
    lng: 117.8757154941559,
    companyName: "default",
    machineryType: "气象站",
    machineryNumber: "40303490",
  },
  {
    type: 'grow',
    lat: 33.92345602484688,
    lng: 117.8745996952057,
    companyName: "default",
    machineryType: "摄像头",
    urlId: "1",
  },
  {
    type: 'grow',
    lat: 33.92147516992544,
    lng: 117.87565648555757,
    companyName: "default",
    machineryType: "摄像头",
    urlId: "2",
  },

  {
    type: 'grow',
    lat: 33.92116357057695,
    lng: 117.87615537643433,
    companyName: "default",
    machineryType: "摄像头",
    urlId: "3",
  },
  {
    type: 'grow',
    lat: 33.92362072306973,
    lng: 117.87443876266481,
    companyName: "default",
    machineryType: "摄像头",
    urlId: "4",
  },
  {
    type: 'grow',
    lat: 33.9246089057202,
    lng: 117.8756457567215,
    companyName: "default",
    machineryType: "摄像头",
    urlId: "5",
  },
  {
    type: 'grow',
    lat: 33.92462671070787,
    lng: 117.876273393631,
    companyName: "default",
    machineryType: "摄像头",
    urlId: "6",
  },
  {
    type: 'grow',
    lat: 33.92257911273178,
    lng: 117.87577986717226,
    companyName: "default",
    machineryType: "摄像头",
    urlId: "7",
  },
  {
    type: camera,
    lat: 33.9231310787706,
    lng: 117.87606418132783,
    companyName: "default",
    machineryType: "摄像头",
    urlId: "8",
  },
  {
    type: camera,

    lat: 33.92357621006792,
    lng: 117.87615001201631,
    companyName: "default",
    machineryType: "摄像头",
    urlId: "9",
  },
  {
    type: camera,
    lat: 33.921617614962315,
    lng: 117.87596762180328,
    companyName: "default",
    machineryType: "摄像头",
    urlId: "10",
  },
  {
    type: camera,
    lat: 33.92303760090268,
    lng: 117.87601590156557,
    companyName: "default",
    machineryType: "摄像头",
    urlId: "11",
  },
  {
    type: camera,
    lat: 33.92368749252881,
    lng: 117.87649333477022,
    companyName: "default",
    machineryType: "摄像头",
    urlId: "12",
  },
  {
    type: camera,
    lat: 33.92352724573907,
    lng: 117.87576377391817,
    companyName: "default",
    machineryType: "摄像头",
    urlId: "13",
  },
  {
    type: camera,
    lat: 33.92171554578704,
    lng: 117.87538826465608,
    companyName: "default",
    machineryType: "摄像头",
    urlId: "14",
  },
  {
    // lat: 33.9227838747441,
    // lng: 117.87455141544343,
    lat: 33.92308656551297,
    type: camera,
    lng: 117.87450313568117,
    companyName: "default",
    machineryType: "摄像头",
    urlId: "15",
  },
  {
    type: camera,
    lat: 33.92106118768512,
    lng: 117.87591934204103,
    companyName: "default",
    machineryType: "摄像头",
    urlId: "16",
  },
  {
    type: 'camera',
    lat: 33.92259246679105,
    lng: 117.87604272365571,
    companyName: "default",
    machineryType: "摄像头",
    urlId: "17",
  },

  {
    lat: 33.92447091693958,
    lng: 117.876273393631,
    companyName: "default",
    machineryType: "摄像头",
    urlId: "18",
  },
  {
    lat: 33.92108789627746,
    lng: 117.87567794322969,
    companyName: "default",
    machineryType: "摄像头",
    urlId: "19",
  },
  {
    lat: 33.92169774019092,
    lng: 117.87584424018861,
    companyName: "default",
    machineryType: "摄像头",
    urlId: "20",
  },
  {
    lat: 33.921706642989434,
    lng: 117.87602663040163,
    companyName: "default",
    machineryType: "摄像头",
    urlId: "21",
  },
  {
    lat: 33.922182941354194,
    lng: 117.87597298622133,
    companyName: "default",
    machineryType: "摄像头",
    urlId: "22",
  },
  {
    lat: 33.920909838837055,
    lng: 117.87573158740999,
    companyName: "default",
    machineryType: "摄像头",
    urlId: "23",
  },
  {
    lat: 33.920371212814395,
    lng: 117.87564039230348,
    companyName: "default",
    machineryType: "摄像头",
    urlId: "24",
  },
  {
    lat: 33.9203133437003,
    lng: 117.87578523159029,
    companyName: "default",
    machineryType: "摄像头",
    urlId: "25",
  },
  {
    lat: 33.921083444846,
    lng: 117.87633240222931,
    companyName: "default",
    machineryType: "摄像头",
    urlId: "26",
  },
  {
    lat: 33.92444420940782,
    lng: 117.87567257881166,
    companyName: "default",
    machineryType: "摄像头",
    urlId: "27",
  },
  {
    lat: 33.920282183391826,
    lng: 117.87553310394289,
    companyName: "default",
    machineryType: "摄像头",
    urlId: "28",
  },
  {
    lat: 33.9209142902776,
    lng: 117.87550628185274,
    companyName: "default",
    machineryType: "摄像头",
    urlId: "29",
  },
])
onMounted(() => {
  init();
});
const init = () => {
  L.TileLayer.prototype.options.maxZoom = 24;
  L.TileLayer.WMS.__super__.options.maxZoom = 24;

  map.value = L.map('leafletContainer').setView([33.9219142902776, 117.87560620185274], 18);

  // L.tileLayer
  //   .wms("https://gis.jw.xcwlkjjs.com/geoserver/jhl/wms", {
  //     layers: "jhl:jhl_plot_pro",
  //     format: "image/png",
  //     transparent: true,
  //     crs: L.CRS.EPSG4326,
  //     zIndex: 5,
  //   })
  //   .addTo(map.value);

  L.tileLayer
    .wms("https://gis.jw.xcwlkjjs.com/geoserver/jhl/wms", {
      layers: "jhl:1234",
      format: "image/png",
      transparent: true,
      crs: L.CRS.EPSG4326,
      zIndex: 5,
    })
    .addTo(map.value);
  L.tileLayer('https://webrd03.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
    attribution: ''
  }).addTo(map.value);
  L.tileLayer('http://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}', {
    attribution: ''
  }).addTo(map.value);
  L.tileLayer('https://webrd03.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
    attribution: ''
  }).addTo(map.value);
  L.tileLayer('http://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}', {
    attribution: ''
  }).addTo(map.value);

  L.tileLayer('http://webst03.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}', {
    attribution: ''
  }).addTo(map.value);

  L.tileLayer('http://webst04.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}', {
    attribution: ''
  }).addTo(map.value);

  camerasList.value.map(item => {
    let img = null;
    switch (item.machineryType) {
      case '摄像头':
        img = camera;
        break;
      case '气象站':
        img = met;
        break;
      case '墒情监测仪':
        img = soil;
        break;
      case '病害识别摄像头':
        img = covid;
        break;
      case '植物生长记录仪':
        img = grow;
        break;
      case '插秧机':
        img = chayang;
        break;

    }
    let greenIcon = L.icon({
      iconUrl: img,
      // shadowUrl: 'leaf-shadow.png',
      iconSize: [38, 95], // size of the icon
      // shadowSize:   [50, 64], // size of the shadow
      // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      // shadowAnchor: [4, 62],  // the same for the shadow
      // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    const marker = L.marker([item.lat, item.lng], { icon: greenIcon }).addTo(map.value)
      .bindPopup(`
      <div>
        <p>设备类型：${item.machineryType}</p>
      </div>
      `)
    if (item.urlId) {
      marker.id = item.urlId
      marker.on('click', function (e) {
        // 在点击事件处理程序中访问id
        console.log(e)
        console.log(this.id)
        urlId.value = this.id
        // alert('Clicked marker id: ' + this.id);
      });
    }

  })


  api.login.getFarmMachinery('1681495753541095426').then(res => {
    console.log(res)
    let mindArr = res.content.filter((it) => it.companyName == "雷沃" || it.companyName == "active")
    // console.log(mindArr)
    // farmMachines.value = mindArr


    mindArr.map(item => {
      let greenIcon = L.icon({
        iconUrl: item.machineryType == '拖拉机' ? tuola : item.machineryType == '水稻机' ? shuidao : chayang,
        // shadowUrl: 'leaf-shadow.png',
        iconSize: [38, 95], // size of the icon
        // shadowSize:   [50, 64], // size of the shadow
        // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        // shadowAnchor: [4, 62],  // the same for the shadow
        // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
      });
      L.marker([item.lat, item.lon], { icon: greenIcon }).addTo(map.value)
        .bindPopup(`
      <div>
        <p>农机品牌：${item.companyName}</p>
        <p>农机类型：${item.machineryType}</p>
        <p>机主名称：${item.userName}</p>
        <p>联系电话：${item.phone}</p>
        <p>作业面积：${item.accArea}亩</p>
        <p>作业时长：${item.accWorkTime}小时</p>
      </div>
      `)
    })
  })


  // .openPopup();

  // 添加一个空图层，背景设置为黑色
  // var emptyLayer = L.tileLayer('', {
  //             attribution: '',
  //             minZoom: 0,
  //             maxZoom: 18
  //         }).addTo(map);

  // 定义矩形的范围
  // var bounds = [[51.49, -0.08], [51.51, -0.06]];
  // var rectangle = L.rectangle(bounds, { color: "white", weight: 1, fillOpacity: 0 }).addTo(map);

  // // 定义不规则图形的顶点坐标
  // var polygon1 = [
  //   [51.49, -0.08],
  //   [51.495, -0.07],
  //   [51.49, -0.06],
  //   [51.485, -0.07]
  // ];

  // var polygon2 = [
  //   [51.495, -0.075],
  //   [51.5, -0.07],
  //   [51.495, -0.065],
  //   [51.49, -0.07]
  // ];

  // var polygon3 = [
  //   [51.5, -0.075],
  //   [51.505, -0.07],
  //   [51.5, -0.065],
  //   [51.495, -0.07]
  // ];

  // // 创建一个图层组
  // var polygonLayerGroup = L.layerGroup().addTo(map);
  // // 添加不规则图形
  // L.polygon(polygon1, { color: 'red' }).addTo(polygonLayerGroup);
  // L.polygon(polygon2, { color: 'blue' }).addTo(polygonLayerGroup);
  // L.polygon(polygon3, { color: 'green' }).addTo(polygonLayerGroup);

  // // 缩放到矩形范围
  // map.fitBounds(bounds);


  // // 定义移除所有不规则图形的函数
  // function removePolygons() {
  //   polygonLayerGroup.clearLayers();
  // }


  // setTimeout(() => {
  //   removePolygons()
  // }, 3000)

}


</script>

<template>
  <div ref="leafletMapBox" id="leafletContainer"></div>
  <!-- <div class="cameraBox">
    <EZUIKitJsVideo :urlId="urlId" :key="urlId" />
  </div> -->
</template>

<style scoped>
/* @import 'leaflet/dist/leaflet.css'; */
#leafletContainer {
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background: #000;
}

.cameraBox {
  position: absolute;
  top: 0;
  background-color: white;
  width: 300px;
  height: 200px;
  z-index: 100;
}
</style>
<style src="@/assets/css/leaflet.css"></style>