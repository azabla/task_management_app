import { createRouter, createWebHistory } from "vue-router";

import RegisterView from "../views/Auth/RegisterView.vue";
import LoginView from "../views/Auth/LoginView.vue";
import CreateView from "@/views/Task/CreateView.vue";
import ShowView from "@/views/Task/ShowView.vue";
import UpdateView from "@/views/Task/UpdateView.vue";
import { useAuthStore } from "@/stores/auth";
import HomeView from "@/views/Task/HomeView.vue";
import Home from "@/views/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: { guest: true },

      // meta: { auth: true },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: HomeView,
      meta: { auth: true },
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      meta: { guest: true },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: { guest: true },
    },
    {
      path: "/create",
      name: "create",
      component: CreateView,
      meta: { auth: true },
    },
    {
      path: "/tasks/:id",
      name: "show",
      component: ShowView,
    },
    {
      path: "/tasks/update/:id",
      name: "update",
      component: UpdateView,
      meta: { auth: true },
    },
  ],
});

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
  await authStore.getUser();

  if (authStore.user && to.meta.guest) {
    return { name: "dashboard" };
  }

  if (!authStore.user && to.meta.auth) {
    return { name: "home" };
  }
});

export default router;


