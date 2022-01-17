<template>
  <a-table :columns="columns" :data-source="data">
    <template #operation="{ record }">
      <a-space>
        <a-button type="primary" @click="Clickview(record.id)">
          新增/修改
        </a-button>
        <a-popconfirm
          v-if="record.store_valid === 1"
          title="確定刪除活動?"
          @confirm="onDelete(record.id)"
        >
          <a-button type="dashed" danger>下架</a-button>
        </a-popconfirm>
        <a-button v-else>上架</a-button>
      </a-space>
    </template>
  </a-table>
</template>

<script>
import { ref } from "@vue/reactivity";
import axios from "axios";
export default {
  setup() {
    const data = ref([]);
    const columns = ref([]);
    axios.get("/api/manager/storelist").then((res) => {
      let storeList = res.data.result;
      for (let field in storeList[0]) {
        columns.value.push({
          title: field,
          dataIndex: field,
          align: "center",
        });
      }
      columns.value.push({
        title: "選項",
        dataIndex: "operation",
        slots: {
          customRender: "operation",
        },
        align: "center",
        width: "15%",
      });
      storeList.forEach((e) => {
        e.key = e.store_id;
      });
      data.value = storeList;
    });

    const onDelete = async () => {
      axios.delete("");
    };

    return {
      data,
      columns,
      onDelete,
    };
  },
};
</script>

<style></style>
