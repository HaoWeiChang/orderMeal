<template>
  <div style="background: #f5f5f5; padding: 16px" v-if="mealLength !== 0">
    <a-row :gutter="[16, 16]">
      <a-col
        v-for="meal in mealList"
        v-bind:todo="meal"
        v-bind:key="meal.id"
        :span="4"
      >
        <a-card :loading="loading" :bordered="false" hoverable>
          <h2>{{ meal.name }}</h2>
          <p>
            {{ meal.note || "一份" }}
          </p>
          <h4>{{ meal.price }}元</h4>
          <template class="ant-card-actions" #actions>
            <a-button type="text" @click="reduceItem(meal.id)">
              <MinusOutlined />
            </a-button>
            <h4>{{ meal.num }}</h4>
            <a-button type="text" @click="AddItem(meal.id)">
              <PlusOutlined />
            </a-button>
          </template>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { message } from "ant-design-vue";
import { defineComponent, ref, computed } from "vue";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  components: { PlusOutlined, MinusOutlined },
  setup() {
    const store = useStore();
    const loading = ref(true);
    const mealList = ref(computed(() => store.state.stores.storeMeal));
    const mealLength = computed(() => store.state.stores.storeMeal.length);
    setTimeout(() => {
      loading.value = !loading.value;
    }, 100);

    const AddItem = async (id) => {
      await store.dispatch("cart/AddMealToCart", id).then(() => {
        message.success("新增成功");
        mealList.value.find((item) => {
          if (item.id === id) {
            item.num++;
            console.log(item);
          }
        });
      });
    };
    const reduceItem = (id) => {
      store
        .dispatch("cart/reduceMealToCart", id)
        .then(() => {
          message.success("移除成功");
          mealList.value.find((item) => {
            if (item.id === id) {
              item.num--;
            }
          });
        })
        .catch((err) => message.error(err));
    };

    return {
      loading,
      AddItem,
      reduceItem,
      mealList,
      mealLength,
    };
  },
});
</script>
