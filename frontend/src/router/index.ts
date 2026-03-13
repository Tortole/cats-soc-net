import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

import CreateComponent from "@/components/post/CreatePost.vue";
import EditComponent from "@/components/post/EditPost.vue";
import PostComponent from "@/components/post/ShowPost.vue";
import HomeView from "@/views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    { path: "/create", name: "Create", component: CreateComponent },
    { path: "/edit/:id", name: "Edit", component: EditComponent },
    { path: "/post/:id", name: "Post", component: PostComponent },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
