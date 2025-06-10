<script setup>
import { ref } from "vue";
import { useSessionStore } from "@/stores/session";
import { storeToRefs } from "pinia";

const sessionStore = useSessionStore();

// Extract the login function from the session store
const { login } = sessionStore;

//locally stored login details entered by user
const username = ref("");
const password = ref("");

const handleLogin = () => {
	if (username.value && password.value) {
		//Pass the values, not the refs, to the login function
		login(username.value, password.value);
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
