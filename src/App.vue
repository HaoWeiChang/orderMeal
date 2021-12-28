<template>
  <router-view />
</template>

<script>
import axios from "axios";
import store from "./store/index";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              alert(error.response.data.message);
              break;
            case 403:
              store.commit("updateState", {});
              alert(error.response.data.error);
              router.replace("/login");
              break;
          }
        }
        return Promise.reject(error);
      }
    );
  },
};
</script>
