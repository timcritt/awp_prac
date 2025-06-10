import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Profile from "@/views/Profile.vue";
import PostDetail from "@/views/PostDetail.vue";
import PostForm from "@/views/PostForm.vue";

const routes = [
	{ path: "/", name: "Home", component: Home },
	{ path: "/login", name: "Login", component: Login },
	{ path: "/post/form/:id?", name: "PostForm", component: PostForm },
	{ path: "/post/:id", name: "PostDetail", component: PostDetail },
	{ path: "/profile/:username", name: "Profile", component: Profile },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
