<template>
    <div class="EZUIKitJsVideo">
        <div id="video-container"></div>
    </div>
</template>

<script setup>
import EZUIKit from "ezuikit-js";
import { useApi } from '@/api/api'
import { nextTick, toRefs, watch, ref, onBeforeUnmount } from "vue";
const props = defineProps({
    urlId: {
        type: String,
        default: "",
    },
});
const { urlId } = toRefs(props);
const api = useApi()

let player;
const destroy = () => {
    if (!player) return;
    const destroyPromise = player.destroy();
    destroyPromise.then((data) => {
        console.log("promise 获取 数据", data);
    });
    player = null;
};
const isImg = ref(false);
watch(
    urlId,
    (n) => {
        destroy();
        console.log("urlId=n", n);
        nextTick(() => {
            init(n);
        });
    },
    {
        deep: true,
        immediate: true,
    }
);

const init = (id) => {
    if (
        localStorage.getItem("accessTokenExpireTime") &&
        localStorage.getItem("accessToken") &&
        Date.now() > Number(localStorage.getItem("accessTokenExpireTime"))
    ) {
        getAccessToken().then((accessToken) => {
            videoPlay(id, accessToken);
        });
    } else {
        let token = localStorage.getItem("accessToken");
        if (token) {
            videoPlay(id, token);
        } else {
            getAccessToken().then((accessToken) => {
                videoPlay(id, accessToken);
            });
        }
    }
};

const getAccessToken = () =>
    new Promise((resolve, reject) => {
        api.camera.getToken().then((res) => {
            console.log(res)
            if (res.status == 200 && res.data.code == 200) {
                console.log("getAccessTokenAPI");
                localStorage.setItem("accessToken", res.data.data.accessToken);
                localStorage.setItem("accessTokenExpireTime", res.data.data.expireTime);
                resolve(res.data.data.accessToken);
            }
        });
    });

const videoPlay = (id, accessToken) => {
    player = new EZUIKit.EZUIKitPlayer({
        id: "video-container", // 视频容器ID
        accessToken,
        url: `ezopen://open.ys7.com/AW4636042/${id}.hd.live`,
        // accessToken: "ra.azkavvw37m4awpmu92yl0kmt54umf04g-3k7v5kxldn-02x1fza-njzolyzw8",
        // url: `ezopen://open.ys7.com/AA2615287/1.live`,
        // simple: 极简版; pcLive: pc直播; pcRec: pc回放; mobileLive: 移动端直播; mobileRec: 移动端回放;security: 安防版; voice: 语音版;
        template: "security",
        // template: "simple",
        code: "nc135246", //ezopen协议地址的设备的视频加密密码
        plugin: ["talk"], // 加载插件，talk-对讲
        handleError: (err) => {
            isImg.value = true;
            console.log("播放器出错1", err);
        },
    });
};
onBeforeUnmount(() => {
    destroy();
});
</script>

<style lang="scss" scoped>
.EZUIKitJsVideo,
#video-container {
    width: 100%;
    height: 100%;
}

.isImg {
    //background: url(@/assets/images/global/cover.png) no-repeat;
    background-size: 100% 100%;
}

:deep(.video-container-wrap) {
    width: 100% !important;
    height: 100% !important;
}
</style>