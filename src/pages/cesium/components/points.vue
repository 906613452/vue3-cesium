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
// import { getGeojson } from "@/common/api/api.js";
import chuzhong from '@/assets/json/chuzhongGEO.json'
import markIcon from '@/assets/images/markIcon.png'



// 聚合实现：https://blog.csdn.net/qq_53979889/article/details/126173439#comments_24834053
// 聚合实现：https://www.jianshu.com/p/80d40c447657

const store = useStore();
// viewer就是cesium实例化之后的场景示例，我把他存在了vuex的store中
const { viewer } = store.state;
const dialogs = ref();
// 先把广告牌实例化，然后再添加到场景中
const billboardsCollection = viewer.scene.primitives.add(
  new Cesium.BillboardCollection()
);

let primitives = null;
// 点位特性信息集合
let pointFeatures = [];
// 先获取点位的json信息
const getJson = () => {
  // getGeojson("/json/chuzhong.geojson").then(({ res }) => {
    // console.log(res);
    const { features } = chuzhong;
    pointFeatures = features;
    formatData(features);
  // });
};

const formatData = (features) => {
  for (let i = 0; i < features.length; i++) {
    const feature = features[i];
    // 每个点位的坐标
    const coordinates = feature.geometry.coordinates;
    // 将坐标处理成3D笛卡尔点
    const position = Cesium.Cartesian3.fromDegrees(
      coordinates[0],
      coordinates[1],
      1000
    );
    const name = feature.properties.name;
    // 画普通的点
    // pointCollection.add({
    //   position,
    //   color: Cesium.Color.CYAN,
    //   pixelSize: 36,
    // })
    // 带图片的点
    billboardsCollection._id = `mark`;
    // add的是Billboard，将一个个Billboard添加到集合当中
    billboardsCollection.add({
      image: markIcon,
      width: 32,
      height: 32,
      position,
    });
    // TODO:如果text是动态的，有性能问题；
    // labelCollection.add({
    //   position,
    //   blendOption: Cesium.BlendOption.TRANSLUCENT, // 半透明，提高性能2倍
    //   text: name,
    //   font: "bold 15px Microsoft YaHei",
    //   // 竖直对齐方式
    //   verticalOrigin: Cesium.VerticalOrigin.CENTER,
    //   // 水平对齐方式
    //   horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
    //   // 偏移量
    //   pixelOffset: new Cesium.Cartesian2(15, 0),
    // })
  }
};
const scene = viewer.scene;
// ScreenSpaceEventHandler的参数是要添加事件的元素，直接给整个画布添加
const handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
handler.setInputAction((e) => {
  console.log("xxxx", e);
  // 获取点击的实体
  const pick = scene.pick(e.position);
  // 判断点击的是不是点位
  if (Cesium.defined(pick) && pick.collection._id.indexOf("mark") > -1) {

    // 拿到点位的属性信息
    const property = pointFeatures[pick.primitive._index];
    // 弹窗所需的参数
    const opts = {
      viewer,
      position: {
        _value: pick.primitive.position,
      },
      title: property.properties.name,
      content: property.properties.address,
      // slotTitle: h('span', {
      //   innerHTML: pick.id.name,
      // })
      // slotContent: h(DialogContent, {
      //   onClose: handleClose
      // }, {
      //   content: () => pick.id.properties.address._value
      // })
    };
    console.log(opts)

  }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);



// viewer.camera.setView({
//   // 从以度为单位的经度和纬度值返回笛卡尔3位置。
//   destination: Cesium.Cartesian3.fromDegrees(120.36, 36.09, 40000),
// });

const onClear = () => {

  billboardsCollection?.removeAll();
  primitives?.removeAll();


};

onUnmounted(() => {
  onClear();
});

onMounted(()=> {
  getJson()
})


</script>
<template>

</template>
<style lang="less" scoped></style>
