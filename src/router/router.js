import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Profile from "@/views/Profile.vue";
import PostDetail from "@/views/PostDetail.vue";
import PostForm from "@/views/PostForm.vue";
import { ROUTES } from "@/router/route-definitions";

import { useSessionStore } from "@/stores/session";

const routes = [
	{ path: ROUTES.HOME.path, name: ROUTES.HOME.name, component: Home },
	{ path: ROUTES.LOGIN.path, name: ROUTES.LOGIN.name, component: Login },
	{
		path: ROUTES.POST_FORM().path,
		name: ROUTES.POST_FORM().name,
		component: PostForm,
		meta: { requiresAuth: true },
	},
	{
		path: ROUTES.POST_DETAIL().path,
		name: ROUTES.POST_DETAIL().name,
		component: PostDetail,
		meta: { requiresAuth: true },
	},
	{
		path: ROUTES.PROFILE().path,
		name: ROUTES.PROFILE().name,
		component: Profile,
		meta: { requiresAuth: true },
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

// Navigation guard to check authentication and redirect if necessary
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
