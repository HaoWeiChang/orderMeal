<template>
  <a-menu
    theme="dark"
    mode="horizontal"
    v-model:selectedKeys="selectedKeys"
    :style="{ lineHeight: '64px' }"
  >
    <a-menu-item v-if="userID != 4" key="1">建立店家</a-menu-item>
    <a-menu-item v-if="userID != 4" key="2">新增菜單</a-menu-item>

    <a-menu-item v-if="userID == 4" key="1">餐廳審核</a-menu-item>
    <a-menu-item v-if="userID == 4" key="2">統計資料</a-menu-item>
  </a-menu>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const store = useStore();
    const userID = computed(() => store.state.user.userID);
    return {
      userID,
      selectedKeys: ref([""]),
    };
  },
});
</script>

<style></style>
