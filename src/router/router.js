import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Profile from "@/views/Profile.vue";
import PostDetail from "@/views/PostDetail.vue";
import PostForm from "@/views/PostForm.vue";

import { useSessionStore } from "@/stores/session";

const routes = [
	{ path: "/", name: "Home", component: Home },
	{ path: "/login", name: "Login", component: Login },
	{
		path: "/post/form/:id?",
		name: "PostForm",
		component: PostForm,
		meta: { requiresAuth: true },
	},
	{
		path: "/post/:id",
		name: "PostDetail",
		component: PostDetail,
		meta: { requiresAuth: true },
	},
	{
		path: "/profile/:username",
		name: "Profile",
		component: Profile,
		meta: { requiresAuth: true },
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

// Nabigation guard to check authentication
router.beforeEach((to, from, next) => {
	const sessionStore = useSessionStore();
	const isAuthenticated = sessionStore.isAuthenticated;

	if (to.meta.requiresAuth && !isAuthenticated) {
		next({ name: "Login" });
	} else {
		next();
	}
});

export default router;
