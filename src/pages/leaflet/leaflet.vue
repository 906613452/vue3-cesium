<script setup >
import { onMounted,watch,ref } from "vue";
import L from "leaflet";

const isView = ref(false)


onMounted(() => {
  init();
});
const init = () => {
    var map = L.map('leafletContainer').setView([51.505, -0.09], 13);

// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);
// 添加一个空图层，背景设置为黑色
var emptyLayer = L.tileLayer('', {
            attribution: '',
            minZoom: 0,
            maxZoom: 18
        }).addTo(map);

        // 定义矩形的范围
        var bounds = [[51.49, -0.08], [51.51, -0.06]];
        var rectangle = L.rectangle(bounds, { color: "white", weight: 1, fillOpacity: 0 }).addTo(map);

        // 定义不规则图形的顶点坐标
        var polygon1 = [
            [51.49, -0.08],
            [51.495, -0.07],
            [51.49, -0.06],
            [51.485, -0.07]
        ];

        var polygon2 = [
            [51.495, -0.075],
            [51.5, -0.07],
            [51.495, -0.065],
            [51.49, -0.07]
        ];

        var polygon3 = [
            [51.5, -0.075],
            [51.505, -0.07],
            [51.5, -0.065],
            [51.495, -0.07]
        ];

          // 创建一个图层组
          var polygonLayerGroup = L.layerGroup().addTo(map);
        // 添加不规则图形
        L.polygon(polygon1, { color: 'red' }).addTo(polygonLayerGroup);
        L.polygon(polygon2, { color: 'blue' }).addTo(polygonLayerGroup);
        L.polygon(polygon3, { color: 'green' }).addTo(polygonLayerGroup);

        // 缩放到矩形范围
        map.fitBounds(bounds);


         // 定义移除所有不规则图形的函数
         function removePolygons() {
            polygonLayerGroup.clearLayers();
        }


        setTimeout(()=> {
            removePolygons()
        },3000)

}


</script>

<template>
  <div id="leafletContainer"></div>

</template>

<style scoped>
/* @import 'leaflet/dist/leaflet.css'; */
#leafletContainer {
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background: #000;
}
</style>
<style src="@/assets/css/leaflet.css"></style>