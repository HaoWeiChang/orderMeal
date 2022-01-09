<template>
  <a-button class="float-right" type="primary" shape="round" @click="backBtn">
    <template #icon>
      <RollbackOutlined />
      返回
    </template>
  </a-button>
  <p
    v-if="activity.valid === 1"
    style="font-size: 28px; margin: 0; margin-right: auto"
  >
    <CheckCircleTwoTone twoToneColor="#52c41a" />
    <span style="color: green">訂餐完成&emsp;</span>
  </p>
  <p
    v-if="activity.Isdelete === 1"
    style="font-size: 28px; margin: 0; margin-right: auto"
  >
    <CloseCircleTwoTone twoToneColor="#ff7171" />
    <span style="color: #ff7171">活動取消&emsp;</span>
  </p>
  <p style="font-size: 28px; margin: 0; margin-right: auto">
    標題:{{ activity.subject }}
  </p>
  <h3>店家:{{ storeInfo.name }}</h3>
  <p>地址:{{ storeInfo.address }}&ensp;&ensp; 電話號碼:{{ storeInfo.phone }}</p>

  <ActivityCard />
  <template
    v-if="
      (activity.valid === 0 || activity.Isdelete === 0) &&
      activity.user_id === userID
    "
  >
    <button
      class="btn btn-success margin-5px"
      @click="completeBtn(activity.id)"
    >
      <CheckCircleTwoTone twoToneColor="#52c41a" />
      訂餐完成
    </button>
    <a-popconfirm title="確定刪除?" @confirm="onDelete(record.id)">
      <button class="btn btn-danger margin-5px">
        <CloseCircleTwoTone twoToneColor="#ff7171" />
        取消活動
      </button>
    </a-popconfirm>
  </template>
</template>
<script>
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { defineComponent, computed } from "vue";
import {
  RollbackOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
} from "@ant-design/icons-vue";
import ActivityCard from "../component/Activity/ActivityCard.vue";
export default defineComponent({
  components: {
    RollbackOutlined,
    ActivityCard,
    CheckCircleTwoTone,
    CloseCircleTwoTone,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const activityID = route.params.id;
    const storeInfo = computed(() => store.state.stores.storeInfo);
    const activity = computed(() => store.state.activity.activityInfo);
    const userID = computed(() => store.state.user.userID);
    store.dispatch("activity/GetActivity", activityID);
    store.dispatch("activity/GetAcitvityContent", activityID);
    const backBtn = () => {
      router.go(-1);
    };
    const completeBtn = (value) => {
      console.log(value);
    };
    const cancelBtn = () => {};
    return {
      userID,
      activity,
      storeInfo,
      backBtn,
      completeBtn,
      cancelBtn,
    };
  },
});
</script>

<style type="text/css">
.btn {
  border: 1px solid black;
  border-radius: 90px;
  background-color: white;
  color: black;
  padding: 7px 14px;
  font-size: 14px;
  cursor: pointer;
}
.btn-success {
  border-color: green;
  color: green;
}
.btn-success:hover {
  background-color: green;
  color: white;
  transition: color 1s;
  -moz-transition: color 1s;
  -webkit-transition: color 1s;
  -o-transition: color 1s;
  transition: background-color 1s;
  -moz-transition: background-color 1s;
  -webkit-transition: background-color 1s;
  -o-transition: background-color 1s;
}
.btn-danger {
  border-color: rgb(255, 71, 71);
  color: rgb(255, 71, 71);
}
.btn-danger:hover {
  background-color: rgb(255, 71, 71);
  color: white;
  transition: color 1s;
  -moz-transition: color 1s;
  -webkit-transition: color 1s;
  -o-transition: color 1s;
  transition: background-color 1s;
  -moz-transition: background-color 1s;
  -webkit-transition: background-color 1s;
  -o-transition: background-color 1s;
}

.float-right {
  float: right;
}
.margin-5px {
  margin: 5px;
}
</style>
