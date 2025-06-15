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
