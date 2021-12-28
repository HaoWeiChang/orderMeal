import { createStore } from "vuex";
import activity from "./modules/activity";
import user from "./modules/user";

export default createStore({ modules: { user, activity } });
