<template>
  <a-button class="backBtn" type="primary" shape="round" @click="backBtn">
    <template #icon>
      <RollbackOutlined />
      返回
    </template>
  </a-button>
  <div>
    <h1>{{ storeInfo.name }}</h1>
    <h4>電話號碼:{{ storeInfo.phone }}</h4>
    <h4>地址:{{ storeInfo.address }}</h4>
  </div>
  <Card />
</template>

<script>
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { defineComponent, computed } from "vue";
import { RollbackOutlined } from "@ant-design/icons-vue";
import Card from "../component/Order/Card";
export default defineComponent({
  components: {
    Card,
    RollbackOutlined,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const activityID = route.params.id;

    const storeInfo = computed(() => store.state.stores.storeInfo);
    store.dispatch("activity/GetActivity", activityID);
    const backBtn = () => {
      router.push("/");
    };

    return {
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
