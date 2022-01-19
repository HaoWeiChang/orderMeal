<template>
  <a-menu v-if="userID === ''" theme="dark" mode="horizontal"></a-menu>

  <a-menu
    v-else-if="userID === 6"
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
    v-else-if="userID === 48"
    v-model:selectedKeys="selectMenu"
    theme="dark"
    mode="horizontal"
  >
    <a-menu-item
      v-for="menu in ntut601"
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
import { useRoute } from "vue-router";
export default defineComponent({
  setup() {
    const store = useStore();
    const route = useRoute();
    const userID = computed(() => store.state.user.userID);
    console.log(userID.value);
    const userName = computed(() => store.state.user.userName);
    const selectMenu = ref([]);
    const menuList = [
      {
        key: "1",
        title: "活動清單",
        path: "/",
      },
      {
        key: "2",
        title: "活動紀錄",
        path: "/activity/history",
      },
      {
        key: "3",
        title: "餐點紀錄",
        path: "/activity/history/order",
      },
    ];
    const adminMenuList = [
      { key: "1", title: "使用者清單", path: "/admin/userlist" },
      { key: "2", title: "餐廳清單", path: "/admin/storelist" },
      { key: "3", title: "SQL", path: "/admin/sqlcommand" },
    ];
    const ntut601 = [
      { key: "1", title: "活動清單", path: "/" },
      { key: "2", title: "活動紀錄", path: "/activity/history" },
      { key: "3", title: "餐點紀錄", path: "/activity/history/order" },
      { key: "4", title: "使用者清單", path: "/admin/userlist" },
      { key: "5", title: "餐廳清單", path: "/admin/storelist" },
      { key: "6", title: "SQL", path: "/admin/sqlcommand" },
    ];

    if (userID.value === 6) {
      switch (route.name) {
        case "admin_userlist":
          selectMenu.value = ["1"];
          break;
        case "admin_storelist":
          selectMenu.value = ["2"];
          break;
        case "admin_sqlcommand":
          selectMenu.value = ["3"];
          break;
      }
    } else if (userID.value === 48) {
      switch (route.name) {
        case "activityList":
          selectMenu.value = ["1"];
          break;
        case "activity_history":
          selectMenu.value = ["2"];
          break;
        case "order_history":
          selectMenu.value = ["3"];
          break;
        case "admin_userlist":
          selectMenu.value = ["4"];
          break;
        case "admin_storelist":
          selectMenu.value = ["5"];
          break;
        case "admin_sqlcommand":
          selectMenu.value = ["6"];
          break;
      }
    } else {
      switch (route.name) {
        case "activityList":
          selectMenu.value = ["1"];
          break;
        case "activity_history":
          selectMenu.value = ["2"];
          break;
        case "order_history":
          selectMenu.value = ["3"];
          break;
      }
    }

    return {
      selectMenu,
      userID,
      userName,
      menuList,
      adminMenuList,
      ntut601,
    };
  },
});
</script>

<style>
a.menu {
  height: 64px;
}
</style>
