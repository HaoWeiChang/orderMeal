<template>
  <a-layout id="components-layout-demo-fixed">
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <div class="userIcon">
        <UserIcon />
      </div>
    </a-layout-header>
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <a-breadcrumb :style="{ margin: '16px 0' }">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
      </a-breadcrumb>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '380px' }">
        <GetActivity />
      </div>
    </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center' }">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>
<script>
import UserIcon from "../component/Header/UserIcon.vue";
import GetActivity from "../component/GetActivity.vue";
export default {
  components: {
    GetActivity,
    UserIcon,
  },
};
</script>

<style>
#components-layout-demo-fixed .userIcon {
  float: right;
}
</style>
