<script setup>
import { useSessionStore } from "../stores/session";
const sessionStore = useSessionStore();
</script>

<template>
	<div class="home">
		<h1>Welcome to KwikPost</h1>
		{{ sessionStore.isAuthenticated }}
		<p>This is the home page.</p>
	</div>
</template>

<style scoped>
.home {
	padding: 2rem;
	text-align: center;
}
</style>
