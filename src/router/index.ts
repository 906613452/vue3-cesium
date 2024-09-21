import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'farm',
        component: () => import('../pages/leaflet/leaflet.vue')
    },
    {
        path: '/xiangshuiMap',
        name: 'xiangshuiMap',
        component: () => import('../pages/leaflet/xiangshuiMap.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
