<template>
  <router-view />
</template>

<script>
import axios from "axios";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response) {
          switch (error.response.status) {
            case 403:
              store.commit("user/updateState", null);
              store.commit("cart/CleanCart");
              message.error(error.response.data.error);
              router.replace("/");
              break;
          }
        }
        return Promise.reject(error);
      }
    );
  },
};
</script>
