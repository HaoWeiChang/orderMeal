<template>
  <div style="background: #f5f5f5; padding: 16px">
    <h1>總消費:{{ totalpay }}</h1>
    <a-row :gutter="[16, 16]">
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
          style="width: 14vw"
        >
          <div
            v-for="meal in content.meal"
            v-bind:key="meal"
            style="display=inline"
          >
            {{ meal.name }} <br />{{ meal.note || "一份" }} {{ meal.price }}元

            <div style="float: right">
              數量&nbsp;:&nbsp;
              <span style="font-weight: bold">{{ meal.num }}</span>
              &nbsp;份
            </div>
            <a-divider style="border-color: #7cb305; margin: 5px" dashed />
          </div>
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
