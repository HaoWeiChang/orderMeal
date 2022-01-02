<template>
  <AddActivity />
  <a-table bordered :data-source="dataSource" :columns="columns" rowKey="id">
    <template #createtime="{ record }">{{
      timeFormat(record.createtime)
    }}</template>
    <template #endtime="{ record }">{{ timeFormat(record.endtime) }}</template>
    <template #operation="{ record }">
      <a-space>
        <a-button v-if="record.user_id !== null" type="primary">點餐</a-button>
        <a-popconfirm
          v-if="record.user_id == userID"
          title="確定刪除?"
          @confirm="onDelete(record.id)"
        >
          <a-button type="dashed" danger>刪除</a-button>
        </a-popconfirm>
      </a-space>
    </template>
  </a-table>
</template>
<script>
import { computed, defineComponent } from "vue";
import AddActivity from "./AddActivity.vue";
import store from "../store";
import moment from "moment";
export default defineComponent({
  components: { AddActivity },
  setup() {
    const columns = [
      {
        title: "主題",
        dataIndex: "subject",
        align: "center",
      },
      {
        title: "餐廳",
        dataIndex: "storeName",
        align: "center",
        width: "15%",
      },
      {
        title: "發起人",
        dataIndex: "initiator",
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
        title: "結束時間",
        dataIndex: "endtime",
        align: "center",
        width: "15%",
        slots: {
          customRender: "endtime",
        },
      },
      {
        title: "operation",
        dataIndex: "operation",
        slots: {
          customRender: "operation",
        },
        align: "center",
        width: "15%",
      },
    ];
    const dataSource = computed(() => store.getters["activity/GetActivity"]);
    store.dispatch("activity/fetchActivity");

    const userID = store.state.user.userID;
    const onDelete = (id) => {
      store.dispatch("activity/DeleteActiviy", id);
    };

    const timeFormat = (time) => {
      time = moment(time).utc();
      return moment(time).format("YYYY-MM-DD HH:mm:ss");
    };

    return {
      columns,
      onDelete,
      userID,
      dataSource,
      timeFormat,
    };
  },
});
</script>
<style>
.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  margin-top: 4px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}
</style>
