<template>
  <a-button type="primary" shape="round" @click="backBtn">
    <template #icon>
      <RollbackOutlined />
      返回
    </template>
  </a-button>
  <a-table :columns="columns" :data-source="data">
    <template #operation="{ record }">
      <a-space>
        <a-button @click="DeleteMeal(record.meal_id)" danger>刪除</a-button>
      </a-space>
    </template>
  </a-table>
  <a-form
    ref="formRef"
    name="dynamic_form_nest_item"
    :model="dynamicValidateForm"
    @finish="onFinish"
  >
    <a-space
      v-for="(meal, index) in dynamicValidateForm.meals"
      :key="meal.id"
      style="display: flex; margin-bottom: 8px"
      align="baseline"
    >
      <a-form-item
        :name="['meals', index, 'name']"
        :rules="{
          required: true,
          message: 'Missing name',
        }"
      >
        <a-input v-model:value="meal.name" placeholder="餐點名稱" />
      </a-form-item>
      <a-form-item
        :name="['meals', index, 'price']"
        :rules="{
          required: true,
          message: 'Missing price',
        }"
      >
        <a-input v-model:value="meal.price" placeholder="餐點價格" />
      </a-form-item>
      <a-form-item
        :name="['meals', index, 'note']"
        :rules="{
          required: true,
          message: 'Missing note',
        }"
      >
        <a-input v-model:value="meal.note" placeholder="餐點備註" />
      </a-form-item>
      <MinusCircleOutlined @click="removeUser(meal)" />
    </a-space>
    <a-form-item>
      <a-button type="dashed" block @click="addUser">
        <PlusOutlined />
        新增餐點
      </a-button>
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        :disabled="dynamicValidateForm.meals.length === 0"
        >確認新增</a-button
      >
    </a-form-item>
  </a-form>
</template>

<script>
import {
  MinusCircleOutlined,
  PlusOutlined,
  RollbackOutlined,
} from "@ant-design/icons-vue";
import axios from "axios";
import { defineComponent, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  components: {
    MinusCircleOutlined,
    PlusOutlined,
    RollbackOutlined,
  },

  setup() {
    const formRef = ref();
    const route = useRoute();
    const router = useRouter();
    const columns = ref([]);
    const data = ref([]);
    const store_id = route.params.id;

    axios.get(`/api/manager/meal/${store_id}`).then((res) => {
      let mealList = res.data.result;
      for (let field in mealList[0]) {
        columns.value.push({
          title: field,
          dataIndex: field,
          align: "center",
        });
      }
      mealList.forEach((e) => {
        e.key = e.meal_id;
      });
      columns.value.push({
        title: "選項",
        dataIndex: "operation",
        slots: {
          customRender: "operation",
        },
        align: "center",
        width: "15%",
      });
      data.value = mealList;
    });

    const dynamicValidateForm = reactive({
      meals: [],
    });

    const removeUser = (item) => {
      let index = dynamicValidateForm.meals.indexOf(item);

      if (index !== -1) {
        dynamicValidateForm.meals.splice(index, 1);
      }
    };

    const addUser = () => {
      dynamicValidateForm.meals.push({
        name: "",
        price: "",
        note: "",
        store_id,
      });
    };
    const DeleteMeal = (meal_id) => {
      axios.delete(`/api/manager/meal/${meal_id}`);
      data.value = data.value.filter((meal) => meal.meal_id !== meal_id);
    };
    const onFinish = () => {
      const payload = {
        meals: dynamicValidateForm.meals,
      };
      axios.post(`/api/manager/meal/${store_id}`, payload).then(router.go(0));
    };
    const backBtn = () => {
      router.go(-1);
    };
    return {
      columns,
      data,
      formRef,
      dynamicValidateForm,
      onFinish,
      removeUser,
      addUser,
      DeleteMeal,
      backBtn,
    };
  },
});
</script>
