import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "./routerGuard";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "forms",
      component: () => import("@/pages/forms/FormsView.vue"),
      beforeEnter: authGuard,
    },
    {
      path: "/add-form",
      name: "addForm",
      component: () => import("@/pages/forms/AddFromView.vue"),
      beforeEnter: authGuard,
    },
    {
      path: "/form/:id",
      name: "formDetails",
      component: () => import("@/pages/forms/FormDetailsView.vue"),
      beforeEnter: authGuard,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/pages/login/LoginView.vue"),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import("@/pages/NotFound.vue"),
    },
  ],
});

export default router;
