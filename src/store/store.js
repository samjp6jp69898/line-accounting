import { createStore } from "vuex";
import basic from "./modules/basic.module";
import user from "./modules/user.module";
import category from "./modules/category.module";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    basic,
    user,
    category,
  }
});
