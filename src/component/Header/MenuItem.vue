<template>
  <a-menu v-if="userID === ''" theme="dark" mode="horizontal"></a-menu>

  <a-menu
    v-else-if="userName === 'Manager'"
    v-model:selectedKeys="selectMenu"
    theme="dark"
    mode="horizontal"
  >
    <a-menu-item
      v-for="menu in adminMenuList"
      v-bind:todo="menu"
      v-bind:key="menu.key"
    >
      <router-link :to="menu.path">{{ menu.title }}</router-link>
    </a-menu-item>
  </a-menu>

  <a-menu
    v-else
    v-model:selectedKeys="selectMenu"
    theme="dark"
    mode="horizontal"
  >
    <a-menu-item
      v-for="menu in menuList"
      v-bind:todo="menu"
      v-bind:key="menu.key"
    >
      <router-link :to="menu.path">{{ menu.title }}</router-link>
    </a-menu-item>
  </a-menu>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const store = useStore();
    const userID = computed(() => store.state.user.userID);
    const userName = computed(() => store.state.user.userName);
    const selectMenu = ref([1]);
    const menuList = ref([
      {
        key: 1,
        title: "活動清單",
        path: "/",
      },
      {
        key: 2,
        title: "歷史紀錄",
        path: "/activity/history/order",
      },
    ]);

    const adminMenuList = ref([
      { key: 1, title: "使用者清單", path: "/" },
      { key: 2, title: "統計資料", path: "/" },
    ]);

    return {
      selectMenu,
      userID,
      userName,
      menuList,
      adminMenuList,
    };
  },
});
</script>

<style>
a.menu {
  height: 64px;
}
</style>
