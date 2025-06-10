<template>
	<div class="login">
		<h1>Login</h1>
		<form @submit.prevent="handleLogin"></form>
	</div>
</template>

<script setup></script>

<style scoped>
.login {
	max-width: 400px;
	margin: 2rem auto;
	padding: 2rem;
	border: 1px solid #ccc;
	border-radius: 8px;
}
.error {
	color: red;
	margin-top: 1rem;
}
</style>
