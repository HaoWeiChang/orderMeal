<template>
  <router-view />
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";
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
          router.replace("/Login");
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default {
  setup() {},
};
</script>
