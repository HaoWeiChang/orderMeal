<template>
  <a-form
    layout="horizontal"
    :model="formState"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    @finish="handleFinish"
    @finishFailed="handleFinishFailed"
  >
    <a-form-item ref="user" label="帳號" name="user">
      <a-input v-model:value="formState.user" placeholder="Account">
        <template #prefix
          ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
        /></template>
      </a-input>
    </a-form-item>
    <a-form-item ref="password" label="密碼" name="password">
      <a-input
        v-model:value="formState.password"
        type="password"
        placeholder="Password"
      >
        <template #prefix
          ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
        /></template>
      </a-input>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button
        type="primary"
        html-type="submit"
        :disabled="formState.user === '' || formState.password === ''"
      >
        Log in
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { defineComponent, reactive } from "vue";
export default defineComponent({
  setup() {
    const formState = reactive({
      user: "",
      password: "",
    });

    const handleFinish = (values) => {
      console.log(values, formState);
    };

    const handleFinishFailed = (errors) => {
      console.log(errors);
    };

    return {
      formState,
      handleFinish,
      handleFinishFailed,
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
    };
  },

  components: {
    UserOutlined,
    LockOutlined,
  },
});
</script>
