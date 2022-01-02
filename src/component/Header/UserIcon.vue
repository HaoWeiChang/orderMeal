<template>
  <a-dropdown>
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
</template>
<script>
import { useStore } from "vuex";
import { defineComponent } from "vue";
export default defineComponent({
  components: {},
  setup() {
    const store = useStore();
    const name = store.state.user.userName;
    const FirstName = name.substr(0, 1);
    const Logout = () => {
      store.dispatch("user/Logout");
    };
    return {
      Logout,
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
