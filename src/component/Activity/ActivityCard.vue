<template>
  <div style="background: #f5f5f5; padding: 16px" v-if="mealLength !== 0">
    <a-row :gutter="[16, 16]">
      <a-col
        v-for="activity in contentList.activity"
        v-bind:todo="activity"
        v-bind:key="activity.id"
        :span="4"
      >
        <a-card :loading="loading" :bordered="false" hoverable>
          <h2>{{ activity.name }}</h2>
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
import { defineComponent, ref, computed } from "vue";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  components: { PlusOutlined, MinusOutlined },
  setup() {
    const store = useStore();
    const loading = ref(true);
    const contentList = computed(() => store.state.activity.activityContent);
    setTimeout(() => {
      loading.value = !loading.value;
    }, 100);

    return {
      contentList,
      loading,
    };
  },
});
</script>
