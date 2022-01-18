<template>
  <a-layout id="components-layout-demo-fixed">
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <div class="userIcon">
        <CartButton />

        <UserIcon />
      </div>
      <MenuItem />
    </a-layout-header>
    <a-layout-content :style="{ marginTop: '64px' }">
      <div
        :style="{
          background: '#fff',
          padding: '24px',
          minHeight: '700px',
        }"
      >
        <router-view></router-view>
      </div>
    </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center' }">
      Order Meal ©2022 Created by mmslab
    </a-layout-footer>
  </a-layout>
</template>
<script>
import UserIcon from "../../component/Header/UserIcon.vue";
import MenuItem from "../../component/Header/MenuItem.vue";
import CartButton from "../../component/Header/CartButton.vue";
export default {
  components: {
    UserIcon,
    MenuItem,
    CartButton,
  },
};
</script>

<style>
#components-layout-demo-fixed .userIcon {
  width: 120px;
  display: flex;
  justify-content: space-around;
  float: right;
}
</style>
