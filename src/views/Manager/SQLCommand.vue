<template>
  <a-textarea
    v-model:value="value"
    placeholder="Basic usage"
    size="large"
    :rows="6"
  />

  <a-button
    type="primary"
    shape="round"
    @click="submitbtn(value)"
    :style="{ marginTop: '5px', marginBottom: '10px' }"
  >
    送出
  </a-button>
  <a-alert
    v-if="visible"
    type="error"
    message="SQL Error"
    :description="errorMsg"
    showIcon
  />
  <a-table v-else :columns="columns" :data-source="data" />
</template>

<script>
import axios from "axios";
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const value = ref("");
    const columns = ref([]);
    const data = ref([]);
    const errorMsg = ref([]);
    const visible = ref(false);
    const submitbtn = async (value) => {
      columns.value = [];
      data.value = [];
      visible.value = false;
      await axios
        .post("/api/manager/sqlcommand", { sql: value })
        .then((res) => {
          if (res.data.error) {
            visible.value = true;
            errorMsg.value = res.data.error;
          } else {
            const obj = res.data.result[0];
            for (let field in obj) {
              columns.value.push({
                title: field,
                dataIndex: field,
              });
            }
            res.data.result.forEach((e, index) => {
              e.key = index;
            });
            data.value = res.data.result;
          }
        });
    };

    return {
      visible,
      value,
      columns,
      data,
      errorMsg,
      submitbtn,
    };
  },
});
</script>

<style></style>
