<template>
  <a-button
    class="editable-add-btn"
    @click="handleAdd"
    style="margin-bottom: 8px"
    >新增活動</a-button
  >
  <a-table bordered :data-source="dataSource" :columns="columns" rowKey="id">
    <template #operation="{ record }">
      <a-popconfirm
        v-if="record.userID == userID"
        @confirm="onDelete(record.id)"
      >
        <a>Delete</a>
      </a-popconfirm>
    </template>
  </a-table>
</template>
<script>
import { computed, defineComponent, onBeforeMount, reactive, ref } from "vue";
import { cloneDeep } from "lodash-es";
import store from "../store";
export default defineComponent({
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
        dataIndex: "operation",
        slots: {
          customRender: "operation",
        },
      },
    ];
    const dataSource = ref([]);
    const { id } = store.getters["user/userData"];
    const userID = id;
    onBeforeMount(async () => {
      await store.dispatch("activity/fetchActivity");
      dataSource.value = store.getters["activity/GetActivityList"];
    });
    const count = computed(() => dataSource.value.length + 1);
    const editableData = reactive({});
    const edit = (id) => {
      editableData[id] = cloneDeep(
        dataSource.value.filter((item) => id === item.id)[0]
      );
    };

    const save = (id) => {
      Object.assign(
        dataSource.value.filter((item) => id === item.id)[0],
        editableData[id]
      );
      delete editableData[id];
    };

    const onDelete = (id) => {
      dataSource.value = dataSource.value.filter((item) => item.id !== id);
    };

    const handleAdd = () => {
      const newData = {
        id: `${count.value}`,
        name: `Edward King ${count.value}`,
        age: 32,
        address: `London, Park Lane no. ${count.value}`,
      };
      dataSource.value.push(newData);
    };

    return {
      columns,
      onDelete,
      handleAdd,
      userID,
      dataSource,
      editableData,
      count,
      edit,
      save,
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
