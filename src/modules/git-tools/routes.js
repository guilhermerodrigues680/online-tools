const routes = [
  {
    path: "",
    component: () => import("./pages/HomeView.vue"),
  },
  {
    path: "change-timestamp-old-commit",
    component: () => import("./pages/ChangeTimestampOldCommitView.vue"),
  },
];

export default routes;
