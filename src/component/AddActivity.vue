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
          <a-time-picker v-model:value="formState.endTime" format="HH:mm" />
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
    /*defualt payload*/
    const formState = reactive({
      subject: "",
      store_id: undefined,
      endTime: "",
      explain: "",
    });

    /*Control Modal*/
    const _formState = toRefs(formState);

    const showModal = () => {
      store.dispatch("stores/GetStoreList");
      visible.value = true;
    };

    /*Get Store Option*/
    const options = computed(() => store.state.stores.storeOptionList);

    /*defualt endTime*/
    _formState.endTime.value = moment();

    const handleOk = () => {
      const createTime = moment().format();
      const { subject, store_id, endTime } = formState;
      const unixtime = endTime.valueOf();
      const _endTime = moment(unixtime).format();
      const payload = {
        subject: subject,
        store_id: store_id,
        creator: store.state.user.userID,
        createtime: createTime,
        endtime: _endTime,
      };
      store.dispatch("activity/PostActivity", payload);
      visible.value = false;
    };

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
