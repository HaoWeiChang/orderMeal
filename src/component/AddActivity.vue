<template>
  <div>
    <a-button type="primary" @click="showModal" style="margin-bottom: 8px">
      建立活動
    </a-button>
    <a-modal
      v-model:visible="visible"
      title="建立活動"
      @ok="handleOk"
      width="100%"
      wrapClassName="full-modal"
    >
      <a-form
        :model="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item label="活動名稱">
          <a-input v-model:value="formState.subject" />
        </a-form-item>
        <a-form-item label="商家">
          <a-select
            v-model:value="formState.store_id"
            placeholder="選擇商家"
            :options="options"
          >
          </a-select>
        </a-form-item>
        <a-form-item label="結束時間">
          <a-time-picker v-model:value="formState.endTimes" format="HH:mm" />
        </a-form-item>
        <a-form-item label="說明">
          <a-input v-model:value="formState.explain" type="textarea" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { defineComponent, ref, reactive, computed } from "vue";
import moment from "moment";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    /*Control Modal*/
    const visible = ref(false);
    const showModal = () => {
      visible.value = true;
    };
    const handleOk = (e) => {
      console.log(e);
      visible.value = false;
    };
    const store = useStore();

    /*Get Store Option*/
    const options = computed(() => store.state.stores.storeOptionList);

    store.dispatch("stores/GetStoreList");

    /*Get User Information */
    const user = computed(() => store.state.user.userID);
    /*defualt payload*/
    const formState = reactive({
      subject: "",
      store_id: null,
      creator: user,
      endTimes: "",
      explain: "",
    });

    /*defualt endTimes*/
    const date = new Date();
    const defualtHours = date.getHours() + 1;
    const defualtMins = date.getMinutes();
    formState.endTimes = ref(moment(`${defualtHours}:${defualtMins}`, "HH:mm"));

    return {
      visible,
      showModal,
      handleOk,
      options,
      formState,
      labelCol: {
        style: {
          width: "150px",
        },
      },
      wrapperCol: {
        span: 14,
      },
    };
  },
});
</script>
<style>
.ant-modal {
  max-width: 50%;
  top: 0;
  margin: 0;
}
.ant-modal-content {
  display: flex;
  flex-direction: column;
}

.ant-modal-body {
  flex: 1;
}
</style>
