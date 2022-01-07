<template>
  <AddActivity v-if="userID !== ''" />
  <a-table bordered :data-source="dataSource" :columns="columns" rowKey="id">
    <template #createtime="{ record }">{{
      timeFormat(record.createtime)
    }}</template>
    <template #endtime="{ record }">{{ timeFormat(record.endtime) }}</template>
    <template #operation="{ record }">
      <a-space v-if="userID !== ''">
        <a-button
          v-if="record.historyID == null || record.historyID == undefined"
          @click="ClickActivity(record.id)"
          >點餐
        </a-button>
        <a-button type="primary" @click="Clickview(record.id)">檢視 </a-button>
        <a-popconfirm
          v-if="userID === record.user_id"
          title="確定刪除活動?"
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
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import AddActivity from "../component/Activity/AddActivity.vue";
import moment from "moment";
export default defineComponent({
  components: { AddActivity },
  setup() {
    const router = useRouter();
    const store = useStore();
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
        title: "選項",
        dataIndex: "operation",
        slots: {
          customRender: "operation",
        },
        align: "center",
        width: "15%",
      },
    ];
    const dataSource = computed(() => store.state.activity.activityList);
    store.dispatch("activity/fetchActivity");

    const userID = computed(() => store.state.user.userID);
    const onDelete = (id) => {
      store.dispatch("activity/DeleteActiviy", id);
    };

    const timeFormat = (time) => {
      return moment(time).format("YYYY-MM-DD HH:mm:ss");
    };
    const ClickActivity = (id) => {
      router.push(`/activity/${id}`);
    };
    const Clickview = (id) => {
      router.push(`/activity/content/${id}`);
    };
    return {
      columns,
      onDelete,
      userID,
      dataSource,
      timeFormat,
      ClickActivity,
      Clickview,
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
