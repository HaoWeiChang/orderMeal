<template>
  <div style="background: #f5f5f5; padding: 16px">
    <a-row :gutter="[16, 16]">
      <a-col
        v-for="meal in mealList"
        v-bind:todo="meal"
        v-bind:key="meal.id"
        :span="4"
      >
        <a-card :loading="loading" :bordered="false">
          <h2>{{ meal.name }}</h2>
          <p>{{ meal.note }}</p>
          <h4>{{ meal.price }}元</h4>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { defineComponent, ref, computed } from "vue";
export default defineComponent({
  setup() {
    const store = useStore();
    const loading = ref(true);
    const mealList = ref(computed(() => store.state.stores.storeMeal));

    setTimeout(() => {
      loading.value = !loading.value;
    }, 2000);

    return {
      loading,
      mealList,
    };
  },
});
</script>
