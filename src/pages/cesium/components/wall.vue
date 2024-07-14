<!--
 * @Descripttion: 底层打点，对于大数据量的点渲染效果更佳
 * @Author: 笙痞
 * @Date: 2023-01-09 14:34:21
 * @LastEditors: 笙痞77
 * @LastEditTime: 2024-06-02 21:31:46
-->

<script setup>
import { nextTick, onMounted, onUnmounted, ref } from "vue";
import { useStore } from "vuex";
import * as Cesium from "cesium";
import Wall from "@/utils/newWall.js";
import wallImg from '@/assets/images/moveTo.png'



// 聚合实现：https://blog.csdn.net/qq_53979889/article/details/126173439#comments_24834053
// 聚合实现：https://www.jianshu.com/p/80d40c447657

const store = useStore();
// viewer就是cesium实例化之后的场景示例，我把他存在了vuex的store中
const { viewer } = store.state;

// viewer.camera.setView({
//   // 从以度为单位的经度和纬度值返回笛卡尔3位置。
//   destination: Cesium.Cartesian3.fromDegrees(120.36, 36.09, 40000),
// });


onMounted(()=> {
  
// var path = [108.95846, 34.22104, 108.96039, 34.22104, 108.96046, 34.21804, 108.95843, 34.21804, 108.95846, 34.22104];
 
 var newWall = viewer.entities.add({
    name: "动态立体墙",
     wall: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
        120.432356908944257, 36.297187409371475, 200.0,
        120.462356908944257, 36.327187409371475, 200.0,
        120.492356908944257, 36.327187409371475, 200.0,
        120.4692356908944257, 36.357187409371475, 200.0,
        120.452356908944257, 36.377187409371475, 200.0,
        120.442356908944257, 36.427187409371475, 200.0,
        120.432356908944257, 36.297187409371475, 200.0,
      ]),
      maximumHeights: [3000, 3000, 3000, 3000, 3000, 3000, 3000],
      minimumHeights: [0, 0, 0, 0, 0, 0, 0],
        
        material: new Wall(Cesium.Color.ORANGE, 3000)

        
     }
 });


//  viewer.flyTo(wall);
})


</script>
<template>

</template>
<style lang="less" scoped></style>
