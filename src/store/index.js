import { createStore /* createLogger */ } from "vuex";
import activity from "./modules/activity";
import user from "./modules/user";
import stores from "./modules/stores";

export default createStore({
  modules: { user, activity, stores },
});
