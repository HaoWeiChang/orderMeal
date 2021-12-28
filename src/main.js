import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import axios from "axios";
const app = createApp(App);

axios.defaults.withCredentials = true;

app.use(store);
app.use(router);
app.use(Antd);
app.mount("#app");
