<template>
  <div class="container">
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
        />
      </a-form-item>
      <a-form-item has-feedback label="確認密碼" name="checkPass">
        <a-input
          v-model:value="formState.checkPass"
          type="password"
          autocomplete="off"
        />
      </a-form-item>
      <a-form-item has-feedback label="姓名" name="name">
        <a-input
          v-model:value="formState.name"
          type="string"
          autocomplete="off"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 10 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
        <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
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
      pass: [
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
    const submit = (values) => {
      store.dispatch("user/Register", values).then(() => {
        router.push("/");
      });
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
        span: 8,
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
  position: absolute;
  width: 350px;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -100%);
}
</style>
