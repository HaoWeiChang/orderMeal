<template>
  <a-button
    v-if="userID !== '' && userID !== 6"
    type="primary"
    shape="round"
    :style="{ marginTop: '16px' }"
    @click="showDrawer"
  >
    <template #icon>
      <ShoppingCartOutlined />
      {{ cartLength }}
    </template>
  </a-button>
  <a-drawer
    title="點餐車"
    width="320px"
    placement="right"
    :closable="false"
    :visible="visible"
    @close="onClose"
  >
    <template v-if="cartLength === 0">
      <a-empty :description="'請進入活動選擇餐點'" />
    </template>
    <a-list v-else size="large" bordered :data-source="cartList">
      <template #renderItem="{ item }">
        <a-list-item>
          {{ item.name }}<br />{{ item.note }}&ensp;{{ item.price }}元
          <div style="float: right">
            數量&nbsp;:&nbsp;
            <span style="font-weight: bold">{{ item.num }}</span>
            &nbsp;份
          </div>
        </a-list-item>
      </template>
    </a-list>

    <div
      :style="{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e8e8e8',
        padding: '10px 16px',
        textAlign: 'right',
        left: 0,
        background: '#fff',
        borderRadius: '0 0 4px 4px',
      }"
    >
      <a-button style="margin-right: 8px" @click="cleanBtn()">清除</a-button>
      <a-button type="primary" @click="summitBtn()" :disabled="cartLength === 0"
        >送出
      </a-button>
    </div>
  </a-drawer>
</template>
<script>
import { ShoppingCartOutlined } from "@ant-design/icons-vue";
import { defineComponent, computed, onMounted, ref } from "vue";
import { Modal, notification } from "ant-design-vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  components: {
    ShoppingCartOutlined,
  },
  setup() {
    const visible = ref(false);
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const userID = computed(() => store.state.user.userID);
    const cartList = computed(() => store.getters["cart/GetcartItem"]);
    const cartLength = computed(() => store.state.cart.items.length);
    const showDrawer = () => {
      visible.value = true;
    };
    const onClose = () => {
      visible.value = false;
    };
    onMounted(() => {
      visible.value = false;
    });
    const cleanBtn = () => {
      store.dispatch("cart/CleanCart");
    };
    const summitBtn = () => {
      Modal.confirm({
        title: () => "確定送出嗎?",
        onOk() {
          const payload = {
            user_id: store.state.user.userID,
            activity_id: route.params.id,
            meals: store.getters["cart/GetcartItem"],
          };
          store.dispatch("cart/CommitCart", payload).then(() => {
            visible.value = false;
            router.replace("/");
            notification["success"]({
              message: "成功送出",
              description: `送出的訂單都會顯示在歷史紀錄，
              快去查看一下吧。`,
              placement: "bottomRight",
            });
          });
        },
        onCancel() {
          visible.value = false;
        },
      });
    };

    return {
      visible,
      userID,
      cartList,
      cartLength,
      showDrawer,
      onClose,
      cleanBtn,
      summitBtn,
    };
  },
});
</script>
