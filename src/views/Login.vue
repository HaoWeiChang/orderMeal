<template>
  <div class="container">
    <a-form
      layout="horizontal"
      :model="payload"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item ref="user" label="帳號" name="user">
        <a-input v-model:value="payload.email" placeholder="Account">
          <template #prefix
            ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
          /></template>
        </a-input>
      </a-form-item>
      <a-form-item ref="password" label="密碼" name="password">
        <a-input
          v-model:value="payload.password"
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
          @click="Login"
          :disabled="payload.user === '' || payload.password === ''"
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
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const payload = reactive({
      email: "",
      password: "",
    });
    const Login = async () => {
      await store.dispatch("Login", payload).then(() => router.replace("/"));
    };
    return {
      payload,
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
