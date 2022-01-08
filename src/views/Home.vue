<template>
  <a-layout id="components-layout-demo-fixed">
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <div class="userIcon">
        <CartButton />

        <UserIcon />
      </div>
      <MenuItem />
    </a-layout-header>
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <a-breadcrumb :style="{ margin: '16px 0' }">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
      </a-breadcrumb>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '790px' }">
        <router-view></router-view>
      </div>
    </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center' }">
      Ant Design ©2018 Created by Haowei
    </a-layout-footer>
  </a-layout>
</template>
<script>
import UserIcon from "../component/Header/UserIcon.vue";
import MenuItem from "../component/Header/MenuItem.vue";
import CartButton from "../component/Header/CartButton.vue";
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
