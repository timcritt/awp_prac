import { defineStore } from "pinia";
import { ref, computed } from "vue";
import * as authService from "@/services/auth-service";

export const useSessionStore = defineStore("session-store", () => {
	const token = ref(null);
	const username = ref(null);
	const name = ref(null);
	const surname = ref(null);
	const errors = ref([]);
	console.log(errors);

	// Update automatically when token changes. Pass this to components to check auth status.
	const isAuthenticated = computed(() => {
		console.log("Checking authetication token");
		return !!token.value;
	});

	// Login with username and password.
	async function login(usernameInput, password) {
		console.log("Attempting login with username:", usernameInput);

		clearErrors();
		let sessionData;
		try {
			sessionData = await authService.login(usernameInput, password);
		} catch (err) {
			clearSession();
			authService.clearAuth();
			addErrors(err.message || "Login failed");
			return;
		}

		setToken(sessionData.token);
		setUsername(sessionData.username);
		setName(sessionData.name);
		setSurname(sessionData.surname);
	}

	// Retrieve user data based on the current username. Token has already been assigned to authService by login
	// Called to populate name and surname when reusing an existing session token after page refresh.
	async function fetchUser() {
		if (!username.value) return;
		const { name, surname } = await authService.fetchUser(username.value);
		setName(name);
		setSurname(surname);
	}

	// Initialize session from local storage
	async function initSession() {
		console.log(
			"Attempting to reinitialise session from stored credentials..."
		);
		const session = authService.restoreAuth();
		if (!session) {
			console.log("No session found in local storage.");
			return;
		}

		setToken(session.token);
		setUsername(session.username);

		// Setup interceptor to clear session on 401 (token has expired or is invalid)
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
		// With an API with real authentication, you would call an API endpoint to log out.
		console.log("Logging out user:", username.value);
		clearSession();
		authService.clearAuth();
	}

	// Setters for mutating state

	function setUsername(u) {
		username.value = u;
	}
	function setToken(t) {
		token.value = t;
	}
	function setName(n) {
		name.value = n;
	}
	function setSurname(s) {
		surname.value = s;
	}

	function clearSession() {
		token.value = null;
		username.value = null;
		name.value = null;
		surname.value = null;
	}
	function clearErrors() {
		errors.value = [];
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
		errors,
		login,
		logout,
		initSession,
		fetchUser,
		addErrors,
	};
});
