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
            labelInValue
            placeholder="選擇商家"
            :options="options"
            @change="handleChange"
          >
          </a-select>
        </a-form-item>
        <a-form-item label="結束時間">
          <a-time-picker
            v-model:value="formState.endTime"
            :minute-step="15"
            format="HH:mm"
            :allowClear="false"
            :inputReadOnly="true"
          />
        </a-form-item>
        <a-form-item label="說明">
          <a-input v-model:value="formState.explain" type="textarea" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { defineComponent, ref, reactive, computed, toRefs } from "vue";
import moment from "moment";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const store = useStore();
    const visible = ref(false);

    /*Get Store Option*/
    const options = computed(() => store.state.stores.storeOptionList);

    /*defualt formState*/
    const formState = reactive({
      subject: "",
      store_id: undefined,
      storeName: "",
      endTime: "",
      explain: "",
    });
    const _formState = toRefs(formState);
    _formState.endTime.value = moment().add(1, "hour");
    console.log(moment());
    /*Control Modal*/
    const showModal = () => {
      store.dispatch("stores/GetStoreList");
      visible.value = true;
    };

    const handleChange = (value) => {
      _formState.storeName.value = value.label;
      _formState.store_id.value = value.key;
      console.log(formState);
    };

    const handleOk = () => {
      const createTime = moment().format("YYYY-MM-DD HH:mm:ss");
      const { subject, store_id, endTime, storeName } = formState;
      const unixtime = endTime.valueOf();
      const _endTime = moment(unixtime).format("YYYY-MM-DD HH:mm:ss");
      const payload = {
        subject: subject,
        store_id: store_id,
        storeName: storeName,
        user_id: store.getters["user/GetUserID"],
        initiator: store.getters["user/GetUserName"],
        createtime: createTime,
        endtime: _endTime,
      };
      store.dispatch("activity/PostActivity", payload);
      visible.value = false;
    };

    return {
      visible,
      showModal,
      handleChange,
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
