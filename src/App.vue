<script setup></script>

<template>
	<main class="main">
		<nav>
			<router-link to="/">Home</router-link>
			<router-link to="/login">Login</router-link>
			<router-link to="/post/form/1">Post Form</router-link>
			<router-link to="/post/2">Post Detail</router-link>
			<router-link to="/profile/hello">Profile</router-link>
		</nav>
		<!-- Router view for displaying components based on the current route -->
		<router-view />
	</main>
</template>

<style scoped>
.main {
	flex: 1;
	overflow-y: auto;
	padding: 1rem;
}
</style>
