<script setup>
import { ref } from "vue";
import { useSessionStore } from "@/stores/session";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const sessionStore = useSessionStore();
const router = useRouter();

// Extract the login function from the session store
const { login, addErrors } = sessionStore;
// reactive variables must be extracted with storeToRefs to avoid losing reactivity
const isAuthenticated = storeToRefs(sessionStore.isAuthenticated);

//login details entered by user
const username = ref("");
const password = ref("");

const handleLogin = async () => {
	if (username.value && password.value) {
		//Pass the values, not the refs, to the login function
		await login(username.value, password.value);

		// Check if the user is authenticated after login
		if (isAuthenticated) {
			// Redirect to the home page after successful login
			router.push("/");
		} else {
			addErrors("Invalid username or password. Please try again.");
		}
	}
};
</script>

<template>
	<main class="login">
		<form class="input-group" @submit.prevent="handleLogin">
			<label for="username">Username:</label>
			<input type="text" placeholder="Username" v-model="username" required />
			<label for="password">Password:</label>
			<input
				type="password"
				placeholder="Password"
				v-model="password"
				required
			/>
			<button class="btn btn--cta" @click="handleLogin">Login</button>
		</form>
	</main>
</template>

<style scoped>
form {
	display: grid;
	place-items: center;
	gap: 20px;
}
</style>
