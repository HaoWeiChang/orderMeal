<template>
  <a-menu v-if="userID === ''" theme="dark" mode="horizontal"></a-menu>

  <a-menu
    v-else-if="userName === 'Menager'"
    v-model:selectedKeys="selectedKeys"
    theme="dark"
    mode="horizontal"
  >
    <a-menu-item
      v-for="menu in adminMenuList"
      v-bind:todo="menu"
      v-bind:key="menu.key"
      >{{ menu.title }}
    </a-menu-item>
  </a-menu>

  <a-menu
    v-else
    v-model:selectedKeys="selectedKeys"
    theme="dark"
    mode="horizontal"
  >
    <a-menu-item
      v-for="menu in menuList"
      v-bind:todo="menu"
      v-bind:key="menu.key"
      >{{ menu.title }}
    </a-menu-item>
  </a-menu>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const userID = computed(() => store.state.user.userID);
    const userName = computed(() => store.state.user.userName);
    const selectedKeys = ref([""]);

    const menuList = ref([
      {
        key: 1,
        title: "建立店家",
        path: "/about",
      },
      { key: 2, title: "新增菜單", path: "/about" },
    ]);

    const adminMenuList = ref([
      { key: 1, title: "餐廳審核", path: "/" },
      { key: 2, title: "統計資料", path: "/" },
    ]);

    if (route.path === "") {
      selectedKeys.value = 0;
    }
    switch (selectedKeys.value) {
      case 1:
        router.push("/about");
    }
    return {
      userID,
      userName,
      menuList,
      adminMenuList,
      selectedKeys,
    };
  },
});
</script>

<style>
a.menu {
  height: 64px;
}
</style>
