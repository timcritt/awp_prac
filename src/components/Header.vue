<script setup>
import { useSessionStore } from "@/stores/session";
import { storeToRefs } from "pinia";
import { ICONS } from "@/assets/icons";

//Access the session store to check if the user is authenticated
const sessionStore = useSessionStore();
const { isAuthenticated } = storeToRefs(sessionStore);
</script>

<template>
	<header class="header">
		<p>
			<span class="logo">{{ ICONS.frisbee }}</span> KwikPost
		</p>

		<button
			v-if="isAuthenticated"
			class="btn new-post btn--circle"
			@click="$router.push('/post/form/1')"
		>
			{{ ICONS.edit }}
		</button>
	</header>
</template>

<style scoped>
/* Header of the application */
.header {
	padding: 10px;
	text-align: center;
	font-size: 20px;
	font-weight: bold;
	box-shadow: 0px 4px 9px 0px rgba(194, 194, 194, 0.25);
	z-index: 1;
}

/* Button to create a new post inside Header */
.btn.new-post {
	position: absolute;
	right: 10px;
	top: 10px;
}

.logo {
	filter: hue-rotate(200deg) saturate(2);
}
</style>
