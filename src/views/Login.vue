<template>
  <div class="container">
    <a-form
      layout="horizontal"
      :model="formState"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      @submit="Login"
    >
      <a-form-item ref="user" label="帳號" name="user">
        <a-input v-model:value="formState.email" placeholder="Account">
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
  </div>
</template>
<script>
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { reactive } from "vue";
import axios from "axios";
export default {
  name: "Login",
  setup() {
    const formState = reactive({
      email: "",
      password: "",
    });
    const Login = async () => {
      await axios.post("http://localhost:3000/api/auth/login", formState);
    };
    return {
      formState,
      Login,
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
};
</script>
<style>
.container {
  max-width: 500px;
  margin: 0px auto;
  overflow: auto;
  justify-content: center;
  min-height: 300px;
  padding: 30px;
}
</style>
