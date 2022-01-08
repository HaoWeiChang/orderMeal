<template>
  <a-button class="backBtn" type="primary" shape="round" @click="backBtn">
    <template #icon>
      <RollbackOutlined />
      返回
    </template>
  </a-button>
  <div>
    <h1>標題:{{ activity.subject }}</h1>
    <h3>店家:{{ storeInfo.name }}</h3>
    <p>地址:{{ storeInfo.address }} &emsp; 電話號碼:{{ storeInfo.phone }}</p>
  </div>

  <ActivityCard />
</template>
<script>
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { defineComponent, computed } from "vue";
import { RollbackOutlined } from "@ant-design/icons-vue";
import ActivityCard from "../component/Activity/ActivityCard.vue";
export default defineComponent({
  components: {
    RollbackOutlined,
    ActivityCard,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const activityID = route.params.id;
    const activity = computed(() => store.state.activity.activityInfo);
    const storeInfo = computed(() => store.state.stores.storeInfo);
    store.dispatch("activity/GetActivity", activityID);
    store.dispatch("activity/GetAcitvityContent", activityID);
    const backBtn = () => {
      router.go(-1);
    };

    return {
      activity,
      storeInfo,
      backBtn,
    };
  },
});
</script>

<style>
.backBtn {
  float: right;
}
</style>
