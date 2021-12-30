<template>
  <AddActivity />
  <a-table bordered :data-source="dataSource" :columns="columns" rowKey="id">
    <template #operation="{ record }">
      <a-popconfirm
        v-if="record.userID == userID"
        @confirm="onDelete(record.id)"
        rowkey="id"
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
        title: "subject",
        dataIndex: "subject",
        width: "30%",
        slots: {
          customRender: "subject",
        },
      },
      {
        title: "creator",
        dataIndex: "creator",
      },
      {
        title: "createtime",
        dataIndex: "createtime",
      },
      {
        title: "endtime",
        dataIndex: "endtime",
        slots: {
          customRender: "endtime",
        },
      },
      {
        title: "operation",
        dataIndex: "id",
        slots: {
          customRender: "operation",
        },
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
