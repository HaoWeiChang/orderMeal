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
      ok-text="建立"
      cancel-text="取消"
    >
      <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="活動名稱" v-bind="validateInfos.subject">
          <a-input v-model:value="formState.subject" />
        </a-form-item>
        <a-form-item label="商家" v-bind="validateInfos.store_id">
          <a-select
            labelInValue
            placeholder="選擇商家"
            :options="options"
            @change="handleChange"
          >
          </a-select>
        </a-form-item>
        <a-form-item label="結束時間" v-bind="validateInfos.endTime">
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
import { Form } from "ant-design-vue";
export default defineComponent({
  setup() {
    const store = useStore();
    const useForm = Form.useForm;
    /*Get Store Option*/
    const options = computed(() => store.state.stores.storeOptionList);
    /*defualt formState*/
    const formState = reactive({
      subject: "",
      store_id: "",
      storeName: "",
      endTime: "",
      explain: "",
    });
    const _formState = toRefs(formState);
    _formState.endTime.value = moment().add(1, "hour");

    let validEndtime = async (rule, value) => {
      const after30mins = moment().add(30, "minute").valueOf();
      if (value.valueOf() < after30mins)
        return Promise.reject("請設定大於30分鐘");
      return Promise.resolve();
    };
    /* form rule */
    const rules = reactive({
      subject: [
        {
          required: true,
          message: "請輸入主題名稱",
        },
      ],
      store_id: [
        {
          required: true,
          message: "請選擇商家",
          trigger: "blur",
          type: "integer",
        },
      ],
      endTime: [
        {
          required: true,
          type: "object",
          validator: validEndtime,
        },
      ],
    });

    const { validate, validateInfos } = useForm(formState, rules);

    /*Control Modal*/
    const visible = ref(false);
    const showModal = () => {
      if (options.value.length === 0) store.dispatch("stores/GetStoreList");
      visible.value = true;
    };

    const handleChange = (value) => {
      _formState.storeName.value = value.label;
      _formState.store_id.value = value.key;
    };

    const handleOk = () => {
      validate()
        .then(() => {
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
        })
        .catch((err) => {
          console.log("error", err);
        });
    };

    return {
      visible,
      validateInfos,
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
