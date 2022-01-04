<template>
  <a-button
    v-if="userID !== ''"
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
    placement="right"
    :closable="false"
    v-model:visible="visible"
  >
    <div v-if="cartLength === 0">尚未點餐</div>
    <a-list v-else size="large" bordered :data-source="cartList">
      <template #renderItem="{ item }">
        <a-list-item>
          {{ item.name }} {{ item.price }}元<br />
          {{ item.note }}<br />
          數量:{{ item.num }}
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
import { defineComponent, computed, ref } from "vue";
import { message, Modal } from "ant-design-vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default defineComponent({
  components: {
    ShoppingCartOutlined,
  },
  setup() {
    const visible = ref(false);
    const store = useStore();
    const route = useRoute();
    const userID = computed(() => store.state.user.userID);
    const cartList = computed(() => store.getters["cart/GetcartItem"]);
    const cartLength = computed(() => store.state.cart.items.length);
    const activityID = route.params.id;
    const showDrawer = () => {
      visible.value = true;
    };
    const cleanBtn = () => {
      store.dispatch("cart/CleanCart");
    };
    const summitBtn = () => {
      Modal.confirm({
        title: () => "確定送出嗎?",
        onOk() {
          const payload = {
            user_id: store.state.user.userID,
            activity_id: activityID,
            meals: store.getters["cart/GetcartItem"],
          };
          store
            .dispatch("cart/CommitCart", payload)
            .then(() => message.success("成功送出"));
          console.log(payload);
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
      cleanBtn,
      summitBtn,
    };
  },
});
</script>
