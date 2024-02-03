import Vue from "vue";
import VueRouter from "vue-router";
import { Home, StudentsList, TeachersList } from "@/views";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/admin",
    name: "dashboard",
    component: Home,
    children: [
      {
        path: "students",
        name: "students",
        component: StudentsList
      },
      {
        path: "teachers",
        name: "teachers",
        component: TeachersList
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
