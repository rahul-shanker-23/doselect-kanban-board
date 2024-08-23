import { createWebHistory, createRouter } from "vue-router";
import Backlog from "./components/Backlog.vue";
import Describe from "./components/Describe.vue";
import Create from "./components/Create.vue";
import Epic from "./components/Epic.vue";
const routes = [
  {
    path: "/",
    component: Backlog,
  },
  {
    path: "/backlog",
    component: Backlog,
  },
  {
    path: "/backlog/:id",
    component: Describe,
  },
  {
    path: "/create",
    component: Create,
  },
  {
    path: "/epic",
    component: Epic,
  },
];

const router = createRouter({
  history: createWebHistory(BASE_PATH),
  routes,
});

export default router;
