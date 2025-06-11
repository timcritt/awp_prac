import { defineStore } from "pinia";
import { ref, computed } from "vue";
import * as authService from "@/services/auth-service";

export const useSessionStore = defineStore("session-store", () => {
	const token = ref(null);
	const username = ref(null);
	const name = ref(null);
	const surname = ref(null);
	const errors = ref([]);

	// Update automatically when token changes. Pass this to components to check auth status.
	const isAuthenticated = computed(() => {
		console.log("Checking authentication status...");

		return !!token.value;
	});

	// Login with username and password.
	async function login(usernameInput, password) {
		console.log("Attempting login with username:", usernameInput);
		const sessionData = await authService.login(usernameInput, password);

		setSession(sessionData);
	}

	// Retrieve user data based on the current username.
	// Called to populate name and surname when reusing an existing session token after page refresh.
	async function fetchUser() {
		if (!username.value) return;
		const userData = await authService.fetchUser(username.value);
		setUser(userData);
	}

	// Initialize session from local storage
	async function initSession() {
		console.log("Initializing session...");
		const session = authService.restoreAuth();
		if (!session) return;

		setSession(session);

		// Setup interceptor to clear session on 401 (token has expired)
		authService.setupAuthInterceptor(() => {
			clearSession();
		});

		try {
			await fetchUser();
		} catch {
			clearSession();
			authService.clearAuth();
		}
	}

	function logout() {
		clearSession();
		authService.clearAuth();
	}

	// Setters for mutating state
	function setSession({
		token: t,
		username: u,
		name: n = null,
		surname: s = null,
	}) {
		token.value = t;
		username.value = u;
		name.value = n;
		surname.value = s;
	}

	function setUser({ name: n, surname: s }) {
		name.value = n;
		surname.value = s;
	}

	function clearSession() {
		token.value = null;
		username.value = null;
		name.value = null;
		surname.value = null;
	}

	function addErrors(newErrors) {
		errors.value = Array.isArray(newErrors) ? newErrors : [newErrors];
	}

	return {
		token,
		username,
		name,
		surname,
		isAuthenticated,
		login,
		logout,
		initSession,
		fetchUser,
		addErrors,
	};
});
