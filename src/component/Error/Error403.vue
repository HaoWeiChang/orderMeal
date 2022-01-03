<template>
  <a-result title="403" sub-title="很抱歉,你目前沒有權限造訪">
    <template #extra>
      <a-button type="primary" @click="BackHomeBtn">Back Home</a-button>
    </template>
  </a-result>
</template>
<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const BackHomeBtn = () => {
      router.push("/");
    };
    return BackHomeBtn;
  },
};
</script>
