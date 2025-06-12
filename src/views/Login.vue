<script setup>
import { ref } from "vue";
import { useSessionStore } from "@/stores/session";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const sessionStore = useSessionStore();
const router = useRouter();

// Extract the login function from the session store
const { login, logout } = sessionStore;
// reactive variables must be extracted with storeToRefs to avoid losing reactivity
const {
	errors,
	isAuthenticated,
	username: storeUsername,
} = storeToRefs(sessionStore);

//login details entered by user
const username = ref("");
const password = ref("");

const handleLogin = async () => {
	if (username.value && password.value) {
		//Pass the values, not the refs, to the login function
		await login(username.value, password.value);
		console.log(isAuthenticated.value);
		// Check if the user is authenticated after login
		if (isAuthenticated.value) {
			// Redirect to the profile page of the user after successful login
			router.push(`/profile/${storeUsername.value}`);
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
		<!-- Display errors if any -->
		<div v-if="errors.length" class="error-messages">
			<p v-for="(error, index) in errors" :key="index">{{ error }}</p>
		</div>
		<button @click="logout">Logout</button>
	</main>
</template>

<style scoped>
form {
	display: grid;
	place-items: center;
	gap: 20px;
}

.error-messages {
	color: red;
}
</style>
