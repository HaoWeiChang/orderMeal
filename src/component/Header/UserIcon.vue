<template>
  <a-dropdown v-if="name !== ''">
    <a class="ant-dropdown-link" @click.prevent>
      <a-avatar style="color: #f56a00; background-color: #fde3cf">
        {{ FirstName }}
      </a-avatar>
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item>歷史紀錄</a-menu-item>
        <a-menu-item @click="Logout">登出 </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <router-link v-else to="/login" replace>
    <a>登入</a>
  </router-link>
</template>
<script>
import { message } from "ant-design-vue";
import { useStore } from "vuex";
import { defineComponent, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  components: {},
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const name = computed(() => store.state.user.userName);
    const FirstName = name.value.substr(0, 1);
    const Logout = () => {
      store.commit("cart/CleanCart");
      store.dispatch("user/Logout").then((res) => {
        message.success(res);
        if (route.path !== "/") router.replace("/");
      });
    };
    return {
      Logout,
      name,
      FirstName,
    };
  },
});
</script>
<style>
.ant-dropdown-link {
  margin-top: 16px;
  height: 32px;
  display: flex;
}
</style>
