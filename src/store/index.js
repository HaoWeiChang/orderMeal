import { createStore } from "vuex";
import { createLogger } from "vuex";
import activity from "./modules/activity";
import user from "./modules/user";
import stores from "./modules/stores";
import cart from "./modules/cart";

const logger = createLogger({
  collapsed: false,
  filter(mutation) {
    // 若 mutation 需要被记录，就让它返回 true 即可
    // 顺便，`mutation` 是个 { type, payload } 对象
    return mutation.type !== "aBlocklistedMutation";
  },
  actionFilter(action) {
    // 和 `filter` 一样，但是是针对 action 的
    // `action` 的格式是 `{ type, payload }`
    return action.type !== "aBlocklistedAction";
  },
  transformer(state) {
    // 在开始记录之前转换状态
    // 例如，只返回指定的子树
    return state.subTree;
  },
  mutationTransformer(mutation) {
    // mutation 按照 { type, payload } 格式记录
    // 我们可以按任意方式格式化
    return mutation.type;
  },
  actionTransformer(action) {
    // 和 `mutationTransformer` 一样，但是是针对 action 的
    return action.type;
  },
  logActions: true, // 记录 action 日志
  logMutations: true, // 记录 mutation 日志
  logState: true,
  logger: console, // 自定义 console 实现，默认为 `console`
});

export default createStore({
  modules: { user, activity, stores, cart },
  plugins: process.env.NODE_ENV !== "production" ? [logger] : [],
});
