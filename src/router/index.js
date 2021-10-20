import Vue from "vue";
import VueRouter from "vue-router";
import siteModule from "@/modules/site";
import gitToolsModule from "@/modules/git-tools";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: siteModule.lazyModuleApp,
    children: siteModule.routes,
  },
  {
    path: "/git-tools",
    component: gitToolsModule.lazyModuleApp,
    children: gitToolsModule.routes,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
