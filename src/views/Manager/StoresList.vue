<template>
  <a-button
    type="primary"
    shape="round"
    @click="showModal"
    :style="{ marginBottom: '10px' }"
    >新增餐廳</a-button
  >
  <a-modal v-model:visible="visible" title="新增用戶" @ok="createbtn()">
    <a-form layout="horizontal" :model="formState">
      <a-form-item label="餐廳名稱">
        <a-input v-model:value="formState.name" placeholder="八方雲集">
        </a-input>
      </a-form-item>
      <a-form-item label="餐廳地址">
        <a-input
          v-model:value="formState.address"
          placeholder="台北市中正區...."
        >
        </a-input>
      </a-form-item>
      <a-form-item label="餐廳電話">
        <a-input v-model:value="formState.phone" placeholder="(02)0800-0000">
        </a-input>
      </a-form-item>
    </a-form>
  </a-modal>
  <a-table :columns="columns" :data-source="data">
    <template #operation="{ record }">
      <a-space>
        <a-button type="primary" @click="Clickview(record.store_id)">
          修改餐點
        </a-button>
        <a-popconfirm
          v-if="record.store_valid === 1"
          title="確認下架餐廳?"
          @confirm="onDelete(record.store_id)"
        >
          <a-button type="dashed" danger>下架</a-button>
        </a-popconfirm>
        <a-button
          v-else
          @click="openStore(record.store_id)"
          :disabled="record.meal_number === 0"
          >上架</a-button
        >
      </a-space>
    </template>
  </a-table>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import axios from "axios";
export default {
  setup() {
    const data = ref([]);
    const columns = ref([]);
    const router = useRouter();
    const visible = ref(false);
    const formState = reactive({
      name: "",
      phone: "",
      address: "",
    });
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

    const onDelete = async (store_id) => {
      const payload = {
        store_id: store_id,
        set: "0",
      };
      axios.post("/api/manager/storelist", payload).then(() => {
        const storeItem = data.value.find(
          (store) => store.store_id === store_id
        );
        storeItem.store_valid = 0;
      });
    };
    const openStore = async (store_id) => {
      const payload = {
        store_id: store_id,
        set: "1",
      };
      axios.post("/api/manager/storelist", payload).then(() => {
        const storeItem = data.value.find(
          (store) => store.store_id === store_id
        );
        storeItem.store_valid = 1;
      });
    };
    const showModal = () => {
      visible.value = true;
    };

    const Clickview = (id) => {
      router.push(`/admin/storemenu/${id}`);
    };

    const createbtn = async () => {
      visible.value = false;
      message.success("餐廳新增成功", 1);
      axios.post("/api/manager/store", formState).then((res) => {
        const pushStore = {
          key: res.data.result,
          store_id: res.data.result,
          store_name: formState.name,
          store_phone: formState.phone,
          store_address: formState.address,
          store_valid: 0,
          meal_number: 0,
        };
        data.value.push(pushStore);
      });
    };
    return {
      visible,
      showModal,
      Clickview,
      formState,
      data,
      columns,
      onDelete,
      openStore,
      createbtn,
    };
  },
};
</script>

<style>
.ant-modal {
  max-width: 50%;
  top: 100px;
  margin: 0 auto;
}
.ant-modal-content {
  display: flex;
  flex-direction: column;
}

.ant-modal-body {
  flex: 1;
}
</style>
