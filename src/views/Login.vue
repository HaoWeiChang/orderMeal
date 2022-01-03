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
        <a-input-password
          v-model:value="payload.password"
          type="password"
          placeholder="input password"
        >
          <template #prefix
            ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
          /></template>
        </a-input-password>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 8 }">
        <a-button type="primary" @click="Login"> Log in </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const payload = reactive({
      email: "",
      password: "",
    });

    const Login = async () => {
      await store
        .dispatch("user/Login", payload)
        .then(() => {
          router.replace("/");
        })
        .catch((err) => message.error(err));
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
  position: absolute;
  width: 400px;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -100%);
}
</style>
