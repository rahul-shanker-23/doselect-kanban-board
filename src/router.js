import { createWebHistory, createRouter } from "vue-router";
import Dashboard from "./components/Dashboard.vue";
import Backlog from "./components/Backlog.vue";
import Issues from "./components/Issues.vue";
const routes = [
  {
    path: "/",
    component: Dashboard,
  },
  {
    path: "/backlog",
    component: Backlog,
  },
  {
    path: "/issues",
    component: Issues,
  },
];

const router = createRouter({
  history: createWebHistory(BASE_PATH),
  routes,
});

export default router;
