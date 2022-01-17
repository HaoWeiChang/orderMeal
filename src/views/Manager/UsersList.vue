<template>
  <a-button type="primary" @click="showModal" :style="{ marginBottom: '10px' }"
    >新增用戶</a-button
  >
  <a-modal v-model:visible="visible" title="新增用戶" @ok="createbtn">
    <a-form layout="horizontal" :model="formState">
      <a-form-item label="用戶名稱">
        <a-input v-model:value="formState.name" placeholder="輸入姓名">
        </a-input>
      </a-form-item>
      <a-form-item label="用戶信箱">
        <a-input v-model:value="formState.email" placeholder="輸入信箱">
        </a-input>
      </a-form-item>
    </a-form>
  </a-modal>
  <a-table :columns="columns" :data-source="data" />
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";
import { defineComponent, ref, reactive } from "vue";
import { message } from "ant-design-vue";
export default defineComponent({
  setup() {
    const router = useRouter();
    const columns = ref([]);
    const data = ref([]);
    const visible = ref(false);
    const formState = reactive({
      name: "",
      email: "",
    });
    axios.get("/api/manager/userlist").then((res) => {
      let userList = res.data.result.userList;
      for (let field in userList[0]) {
        columns.value.push({
          title: field,
          dataIndex: field,
          align: "center",
        });
      }
      userList.forEach((e) => {
        e.key = e.user_id;
      });
      data.value = userList;
    });

    const showModal = () => {
      visible.value = true;
    };

    const createbtn = async () => {
      visible.value = false;
      let payload = {
        name: formState.name,
        email: `${formState.email}@gmail.com`,
        password: "ntut",
      };
      const callback = axios.post("/api/user/account", payload);
      message
        .loading("建立中", await callback)
        .then(() =>
          message.success("用戶新增成功", 0.5).then(() => router.go(0))
        );
    };
    return {
      visible,
      columns,
      data,
      showModal,
      formState,
      createbtn,
    };
  },
});
</script>

<style></style>
