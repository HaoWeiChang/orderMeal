<template>
  <div class="container">
    <a-card style="width: 450px">
      <a-typography-title :level="3" style="text-align: center"
        >登入</a-typography-title
      >
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
        <a-form-item :wrapper-col="{ span: 4, offset: 6 }">
          或 <router-link :to="'/register'">註冊</router-link>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 8 }">
          <a-button type="primary" @click="Login"> 登入 </a-button>
        </a-form-item>
      </a-form>
    </a-card>
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
          router.push("/");
        })
        .catch((err) => message.error(err));
    };
    return {
      payload,
      Login,
      labelCol: {
        span: 6,
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
  padding-top: 10%;
  margin-left: auto;
  margin-right: auto;
  width: 400px;
}
</style>
