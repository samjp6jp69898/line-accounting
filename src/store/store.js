import { createStore } from "vuex";
import basic from "./modules/basic.module";
import line from "./modules/line.module";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    basic,
    line
  }
});
