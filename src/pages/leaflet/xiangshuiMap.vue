<script setup>
import { ElMessage } from 'element-plus'
import { onMounted, watch, ref } from "vue";
// import L from "leaflet";
import * as L from "leaflet";
import "@/assets/js/Leaflet.InternetMapCorrection.js";
import { useApi } from '@/api/api'
import camera from '@/assets/images/camera.svg'
import covid from '@/assets/images/covid.svg'
import grow from '@/assets/images/grow.svg'
import org from '@/assets/images/org.png'
import org_check from '@/assets/images/org_check.png'
import { Search } from '@element-plus/icons-vue'
const searchInput = ref()
const leafletMapBox = ref(null);
const api = useApi()
const map = ref()
const markerLayer = ref()
const showDetailState = ref(0)
const highlightedMarker = ref(null); // 存储高亮的 marker
const orgInfo = ref()
const loading = ref(false)
const allOrgsData = ref()
const markers = ref({})
onMounted(() => {
  init();
});
const normalIcon = L.icon({
  iconUrl: org,
  iconSize: [38, 38], // 大小
});

const highlightedIcon = L.icon({
  iconUrl: org_check,
  iconSize: [38, 38], // 高亮大小
});
const init = () => {
  loading.value = true
  L.TileLayer.prototype.options.maxZoom = 18;
  L.TileLayer.WMS.__super__.options.maxZoom = 18;

  map.value = L.map('leafletContainer').setView([34.130519365903396, 119.65046049639598], 13);
  markerLayer.value = L.layerGroup().addTo(map.value);
  // let greenIcon = L.icon({
  //       iconUrl: covid,
  //       // shadowUrl: 'leaf-shadow.png',
  //       iconSize: [38, 95], // size of the icon
  //       // shadowSize:   [50, 64], // size of the shadow
  //       // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  //       // shadowAnchor: [4, 62],  // the same for the shadow
  //       // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  //     });


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



  // 地图点击事件
  map.value.on('click', () => {
    showDetailState.value = 0; // 状态变为1
    if (highlightedMarker.value) {
      highlightedMarker.value.setIcon(normalIcon); // 恢复非高亮图标
      highlightedMarker.value = null;
    }
  });

  map.value.on('movestart', () => {
    // showDetailState.value = 0; // 移动地图时状态变为1
    // if (highlightedMarker.value) {
    //   highlightedMarker.value.setIcon(normalIcon); // 恢复非高亮图标
    //   highlightedMarker.value = null;
    // }
  });



  api.login.getOrgsList('320921').then(res => {
    // console.log(res)
    allOrgsData.value = res
    res.map(item => {

      let marker = L.marker([item.lat, item.lng], { icon: normalIcon }).addTo(markerLayer.value)
      markers.value[item.enterpriseName] = marker;

      marker.on('click', function (e) {
        e.originalEvent.stopPropagation(); // 阻止地图点击事件
        showDetailState.value = 1
        console.log(item)
        orgInfo.value = item
        if (highlightedMarker.value) {
          highlightedMarker.value.setIcon(normalIcon); // 恢复之前高亮的 marker
        }
        console.log(marker)
        marker.setIcon(highlightedIcon); // 设置当前 marker 高亮
        highlightedMarker.value = marker; // 记录当前高亮的 marker

        const zoomLevel = 13;
        const offset = [0, 150]; // 偏移量，Y轴向上偏移100像素

        // 获取当前标记的像素坐标
        const point = map.value.latLngToLayerPoint([item.lat, item.lng]);
        // 计算偏移后的像素坐标
        const newPoint = L.point(point.x + offset[0], point.y + offset[1]);
        // 将偏移后的像素坐标转换回经纬度
        const newLatLng = map.value.layerPointToLatLng(newPoint);

        // 设置地图视角到偏移后的坐标
        map.value.setView(newLatLng, zoomLevel, { animate: true });


      });
    })
  }).finally(() => {
    loading.value = false
  })

}

const changeSearch = () => {
  console.log(searchInput.value)
  let item = allOrgsData.value.find(item => { return item.enterpriseName == searchInput.value })
  // console.log(item)
  if (item) {
    let marker = markers.value[item.enterpriseName];

    showDetailState.value = 1
    // console.log(item)
    orgInfo.value = item

    // console.log(marker)
    // console.log(highlightedMarker.value)
    // console.log(highlightedIcon)
    // console.log(markers.value)
    if (highlightedMarker.value) {
      // console.log('已有高亮')
      highlightedMarker.value.setIcon(normalIcon); // 恢复之前高亮的 marker
    }

    setTimeout(() => {

      // console.log('设置高亮111')
      marker.setIcon(highlightedIcon); // 设置当前 marker 高亮
      highlightedMarker.value = marker; // 记录当前高亮的 marker

      const zoomLevel = 13;
      const offset = [0, 150]; // 偏移量，Y轴向上偏移100像素

      // 获取当前标记的像素坐标
      const point = map.value.latLngToLayerPoint([item.lat, item.lng]);
      // 计算偏移后的像素坐标
      const newPoint = L.point(point.x + offset[0], point.y + offset[1]);
      // 将偏移后的像素坐标转换回经纬度
      const newLatLng = map.value.layerPointToLatLng(newPoint);

      // 设置地图视角到偏移后的坐标
      map.value.setView(newLatLng, zoomLevel, { animate: true });
    })





  } else {
    ElMessage.error('查无此点')
  }


}

watch(() => highlightedMarker.value, (newValue, oldValue) => {
  console.log(newValue)
})
// watch(()=> store.state.viewer, (newValue, oldValue) =>{
//   console.log(newValue)
//   if(newValue) {
//     isView.value = true
//   }
// })
</script>

<template>
  <div class="coverBox" v-if="loading">
    地图加载中···
  </div>
  <div class="searchBox">
    <el-input v-model="searchInput" style="width: 100%" size="large" placeholder="请输入服务组织名称" :suffix-icon="Search" />
    <div class="searchBtn" @click="changeSearch">搜索</div>
  </div>

  <div ref="leafletMapBox" id="leafletContainer"></div>
  <div class="orgInfo" v-if="showDetailState">
    <div class="item">
      <div class="label">组织名称：</div>
      <div class="value">{{ orgInfo.enterpriseName }}</div>
    </div>
    <div class="item">
      <div class="label">联系人：</div>
      <div class="value">{{ orgInfo.name }}</div>
    </div>
    <div class="item">
      <div class="label">统一社会信用代码：</div>
      <div class="value">{{ orgInfo.creditCode }}</div>
    </div>
    <div class="item">
      <div class="label">地址：</div>
      <div class="value">{{ orgInfo.address }}</div>
    </div>
    <div class="item">
      <div class="label">企业状态：</div>
      <div class="value">{{ orgInfo.status }}</div>
    </div>
    <div class="item">
      <div class="label">创建日期：</div>
      <div class="value">{{ orgInfo.establishDate }}</div>
    </div>
    <div class="item">
      <div class="label">核准日期：</div>
      <div class="value">{{ orgInfo.approvalDate }}</div>
    </div>
    <div class="item">
      <div class="label">注册资金：</div>
      <div class="value">{{ orgInfo.registeredCapital }}万元</div>
    </div>
    <div class="item">
      <div class="label">主营业务：</div>
      <div class="value">{{ orgInfo.businessScope }}</div>
    </div>
  </div>
  <!-- <div class="cameraBox">
    <EZUIKitJsVideo :urlId="urlId" :key="urlId" />
  </div> -->
</template>

<style lang="scss" scoped>
/* @import 'leaflet/dist/leaflet.css'; */
.searchBox {
  position: absolute;
  z-index: 2;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 95%;

  .searchBtn {
    width: 60px;
    height: 30px;
    border-radius: 5px;
    text-align: center;
    line-height: 30px;
    color: #fff;
    background: #4bd156;
    // border: 1px solid #aaa;
    position: absolute;
    right: 4px;
    top: 5px;
    font-size: 14px;
  }
}

.coverBox {
  width: 100vw;
  height: 100vh;
  z-index: 101;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ccc;
}

#leafletContainer {
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background: #000;
}

.orgInfo {
  position: absolute;
  bottom: 0;
  background-color: white;
  width: 100%;
  height: 50%;
  z-index: 100;
  overflow: auto;
  padding: 20px 0;
  border-radius: 10px 10px 0 0;
  font-size: 14px;

  .item {
    display: flex;
    flex-direction: row;
    padding: 5px;

    .label {
      flex: 2;
      text-align: right;
      color: #888;
    }

    .value {
      flex: 3;
      text-align: left;
      padding-right: 10px;
    }
  }
}
</style>
<style src="@/assets/css/leaflet.css"></style>
<style>
.leaflet-control {
  display: none;
}
</style>