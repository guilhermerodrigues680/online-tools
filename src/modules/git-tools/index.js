import routes from "./routes";
// https://vueschool.io/articles/vuejs-tutorials/lazy-loading-and-code-splitting-in-vue-js/
const lazyModuleApp = () => import("./ModuleApp.vue");

export default {
  routes,
  lazyModuleApp,
};
