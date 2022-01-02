<template>
  <div class="about">
    <h1>{{}}</h1>
  </div>
</template>
<script>
import store from "../store";
export default {
  setup() {
    console.log(store.state.user.isLogin);
  },
};
</script>
