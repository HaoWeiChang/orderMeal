<template>
  <a-table
    bordered
    :data-source="dataSource"
    :columns="columns"
    rowKey="historyID"
  >
    <template #createtime="{ record }">{{
      timeFormat(record.createTime)
    }}</template>
    <template #operation="{ record }">
      <a-space>
        <a-button
          v-if="userID !== ''"
          type="primary"
          @click="Clickview(record.activityID)"
          >檢視</a-button
        >
        <a-popconfirm
          v-if="
            record.activityValid === 0 &&
            record.activityDelete === 0 &&
            record.historyDelete === 0
          "
          title="確定刪除?"
          @confirm="onDelete(record.historyID)"
        >
          <a-button type="dashed" danger>刪除</a-button>
        </a-popconfirm>
      </a-space>
    </template>
  </a-table>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import moment from "moment";
export default {
  setup() {
    const store = useStore();
    const userID = computed(() => store.state.user.userID);
    const dataSource = computed(() => store.state.activity.historyList);
    const router = useRouter();
    store.dispatch("activity/GetOrderHistory");
    const columns = [
      {
        title: "主題",
        dataIndex: "subject",
        align: "center",
        width: "15%",
        hieght: "20%",
      },
      {
        title: "餐廳",
        dataIndex: "storeName",
        align: "center",
        width: "15%",
      },
      {
        title: "發起人",
        dataIndex: "userName",
        align: "center",
        width: "10%",
      },
      {
        title: "建立時間",
        dataIndex: "createtime",
        align: "center",
        width: "15%",
        slots: {
          customRender: "createtime",
        },
      },
      {
        title: "選項",
        dataIndex: "operation",
        slots: {
          customRender: "operation",
        },
        align: "center",
        width: "15%",
      },
    ];
    const timeFormat = (time) => {
      return moment(time).format("YYYY-MM-DD HH:mm:ss");
    };
    const Clickview = (id) => {
      router.push(`/activity/${id}`);
    };
    const onDelete = (historyID) => {
      store.dispatch("activity/DeleteOrderHistory", historyID);
    };
    return { userID, columns, dataSource, timeFormat, Clickview, onDelete };
  },
};
</script>

<style></style>
