<script setup>
import { onMounted } from "vue";
import { useSessionStore } from "@/stores/session";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

const session = useSessionStore();

//call the initSession method when the component is mounted
// This initializes the session, checking for any existing user session data
onMounted(() => {
	session.initSession();
});
</script>

<template>
	<Header> </Header>
	<main class="main">
		<nav>
			<router-link to="/">Home</router-link>
			<router-link to="/login">Login</router-link>
			<router-link to="/post/form/1">Post Form</router-link>
			<router-link to="/post/2">Post Detail</router-link>
			<router-link :to="`/profile/${session.username}`">Profile</router-link>
		</nav>
		<!-- Router view for displaying components based on the current route -->
		<router-view />
	</main>
	<Footer></Footer>
</template>

<style scoped>
.main {
	flex: 1;
	overflow-y: auto;
	padding: 1rem;
}
</style>
