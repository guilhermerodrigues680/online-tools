import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// CSS
import "@/styles/global.scss";

// Habilitar o :active do css em dispositivos moveis
// https://stackoverflow.com/questions/8330559/hover-effects-using-css3-touch-events
document.body.addEventListener("touchstart", function () {}, false);
// document.addEventListener("touchstart", function(){}, true)

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
