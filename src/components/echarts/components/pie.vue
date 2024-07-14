<script setup lang="ts">
import { reactive } from 'vue';
import Echarts from '../echarts.vue';


const pieData = reactive([
	{
		name: '有机产品',
		value: 2100
	},
	{
		name: '无机蔬菜',
		value: 2502
	},
	{
		name: '自动化农药',
		value: 3156
	}
]);

const option:any = reactive({
	color: ['#18F6F8', '#288CFC', '#FFD91A'],
	legend: {
		top: '10px',
		icon: 'circle',
		color: '#555',
		itemWidth: 10,
		itemHeight: 10
	},
	tooltip: {
		confine: true,
		trigger: 'item',
		formatter: '{b} : {c}'
	},
	series: [
		{
			avoidLabelOverlap: false,
			type: 'pie',
			roseType: 'area', // 玫瑰图
			center: ['50%', '50%'],
			radius: ['30%', '60%'],
			label: {
				formatter: '{b}\n-------------\n{d}%\t{c}',
				fontSize: 16
			},
			labelLine: {
				length: 10,
				length2: 30
			},
			data: pieData
		}
	]
});
</script>

<template>
	<div class="outerEcharts">
		<Echarts :option="option" />
	</div>
</template>
<style scoped>
.outerEcharts {
    width: 360px;
    height: 260px;
    margin-top: 30px;
    box-shadow: 0 0 5px rgba(255,255,255,0.3);
    border-radius: 5px;
}
</style>

