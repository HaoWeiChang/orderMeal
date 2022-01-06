<template>
  <div class="container">
    <a-card style="width: 450px">
      <a-typography-title :level="3" style="text-align: center"
        >註冊新用戶</a-typography-title
      >
      <a-form
        layout="horizontal"
        name="custom-validation"
        ref="formRef"
        :model="formState"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        @finish="submit"
      >
        <a-form-item has-feedback label="帳號" name="email">
          <a-input-group>
            <a-auto-complete
              style="width: 233px"
              v-model:value="formState.email"
              :options="[{ value: `${formState.email}@gmail.com` }]"
              placeholder="請輸入email"
            />
          </a-input-group>
        </a-form-item>
        <a-form-item has-feedback label="密碼" name="password">
          <a-input
            v-model:value="formState.password"
            type="password"
            autocomplete="off"
            placeholder="請輸入密碼"
          />
        </a-form-item>
        <a-form-item has-feedback label="確認密碼" name="checkPass">
          <a-input
            v-model:value="formState.checkPass"
            type="password"
            autocomplete="off"
            placeholder="請輸入密碼"
          />
        </a-form-item>
        <a-form-item has-feedback label="姓名" name="name">
          <a-input
            v-model:value="formState.name"
            type="string"
            autocomplete="off"
            placeholder="請輸入中文姓名"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 4, offset: 6 }">
          或 <router-link :to="'/login'">登入</router-link>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 8 }">
          <a-button type="primary" html-type="submit">註冊</a-button>
          <a-button style="margin-left: 10px" @click="resetForm">清除</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>
<script>
import { defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();
    const formRef = ref();
    const formState = reactive({
      email: "",
      password: "",
      checkPass: "",
      name: "",
    });
    let validateEmail = async (rule, value) => {
      const regexp = /^([A-Za-z0-9])+@(gmail.com)$/;
      const Email = value.match(regexp);
      console.log(Email);
      if (value === "") {
        return Promise.reject("請輸入Email");
      } else if (Email === null) {
        return Promise.reject("請輸入@gmail.com格式");
      } else {
        return Promise.resolve();
      }
    };
    let validatePass = async (rule, value) => {
      if (value === "") {
        return Promise.reject("請輸入密碼");
      } else if (value.length > 16 || value.length < 6) {
        return Promise.reject("請輸入6~16位字元");
      } else {
        if (formState.checkPass !== "") {
          formRef.value.validateFields("checkPass");
        }
        return Promise.resolve();
      }
    };

    let validatePass2 = async (rule, value) => {
      if (value === "") {
        return Promise.reject("請輸入密碼");
      } else if (value.length > 16 || value.length < 6) {
        return Promise.reject("請輸入6~16位字元");
      } else if (value !== formState.password) {
        return Promise.reject("與設定密碼不相符");
      } else {
        return Promise.resolve();
      }
    };
    let validateName = async (rule, value) => {
      const regexp = /^[\u4E00-\u9FA5]+$/;
      const valid = value.match(regexp);
      if (value === "") {
        return Promise.reject("請輸入姓名");
      } else if (!valid) {
        return Promise.reject("請中文姓名");
      } else {
        return Promise.resolve();
      }
    };

    const rules = {
      email: [
        {
          required: true,
          validator: validateEmail,
          trigger: "change",
        },
      ],
      password: [
        {
          required: true,
          validator: validatePass,
          trigger: "change",
        },
      ],
      checkPass: [
        {
          required: true,
          validator: validatePass2,
          trigger: "change",
        },
      ],
      name: [
        {
          required: true,
          validator: validateName,
          trigger: "change",
        },
      ],
    };
    const submit = async (values) => {
      await store
        .dispatch("user/Register", values)
        .then(() => {
          router.push("/");
        })
        .catch((error) => message.error(error));
    };
    const resetForm = () => {
      formRef.value.resetFields();
    };

    return {
      formState,
      formRef,
      rules,
      submit,
      resetForm,
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 14,
      },
    };
  },
});
</script>
<style>
.container {
  padding-top: 10%;
  margin-left: auto;
  margin-right: auto;
  width: 400px;
}
</style>
