import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

export const useSessionStore = defineStore("session-store", () => {
	const token = ref(null);
	const name = ref(null);
	const surname = ref(null);

	const isAuthenticated = computed(() => !!token.value);

	async function login(username, password) {
		const payload = {
			username: username,
			password: password,
		};

		try {
			const response = await axios.post("http://localhost:3000/login", payload);

			console.log("Login successful:", response.data);
			// You can store token or user data here
			// localStorage.setItem('token', response.data.token)
		} catch (error) {
			if (error.response) {
				console.error("Login failed:", error.response.data);
			} else if (error.request) {
				console.error("No response received from server");
			} else {
				console.error("Error:", error.message);
			}
		}
	}

	return { token, name, surname, isAuthenticated, login };
});
