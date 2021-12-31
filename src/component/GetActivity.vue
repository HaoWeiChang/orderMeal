<template>
  <AddActivity />
  <a-table bordered :data-source="dataSource" :columns="columns" rowKey="id">
    <template #operation="{ record }">
      <a-popconfirm
        v-if="record.user_id == userID"
        @confirm="onDelete(record.id)"
      >
        <a>Delete</a>
      </a-popconfirm>
    </template>
  </a-table>
</template>
<script>
import { computed, defineComponent } from "vue";
import AddActivity from "./AddActivity.vue";
import store from "../store";
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
        title: "createtime",
        dataIndex: "createtime",
        align: "center",
        width: "15%",
      },
      {
        title: "endtime",
        dataIndex: "endtime",
        align: "center",
        width: "15%",
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

    return {
      columns,
      onDelete,
      userID,
      dataSource,
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
