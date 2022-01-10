<template>
  <div style="background: #f5f5f5; padding: 16px">
    <h1>總消費:{{ totalpay }}</h1>
    <template v-if="contentList.length === 0">
      <a-empty :description="'沒有人點餐'" />
    </template>
    <a-row v-else :gutter="[16, 8]">
      <a-col
        v-for="content in contentList"
        v-bind:todo="content"
        v-bind:key="content.id"
        :span="4"
      >
        <a-card
          :bordered="false"
          hoverable
          :title="content.userName"
          style="min-width: 180px; width: 25vh,max-width:290px"
        >
          <template
            v-for="meal in content.meal"
            v-bind:key="meal"
            style="display=inline"
          >
            {{ meal.name }} <br />
            {{ meal.note || "一份" }}&ensp;{{ meal.price }}元
            <div style="float: right">
              數量&nbsp;:&nbsp;
              <span style="font-weight: bold">{{ meal.num }}</span>
              &nbsp;份
            </div>
            <a-divider style="border-color: #7cb305; margin: 5px" dashed />
          </template>
          <h3>需支付:{{ content.needPay }}</h3>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { defineComponent, ref, computed } from "vue";
export default defineComponent({
  setup() {
    const store = useStore();
    const loading = ref(true);
    const contentList = computed(() => store.state.activity.activityContent);
    const totalpay = computed(() => store.state.activity.totalPay);
    return {
      contentList,
      loading,
      totalpay,
    };
  },
});
</script>
<style></style>
