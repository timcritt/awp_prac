<script setup>
import { useSessionStore } from "@/stores/session";
import { toRefs } from "vue";
import { ICONS } from "@/assets/icons";

const session = useSessionStore();
const { profileImg, username, isAuthenticated } = toRefs(session);
</script>
<template>
	<footer class="footer">
		<nav class="menu">
			<router-link
				to="/"
				class="menu-link"
				:class="{ active: $route.path === '/' }"
				href="/	"
			>
				{{ ICONS.home }}
			</router-link>
			<router-link
				:to="`/profile/${username}`"
				class="menu-link"
				:class="{ active: $route.path === '/login' }"
				href="/login"
			>
				<img
					v-if="isAuthenticated"
					:src="profileImg"
					alt="Profile Image"
					class="profile-img"
				/>
				<span v-else>{{ ICONS.login }}</span>
			</router-link>
		</nav>
	</footer>
</template>
<style scoped>
.menu {
	display: flex;
	justify-content: space-around;
	padding: 15px;
	border-top: 1px solid #ddd;
	background: white;
	border-end-end-radius: 20px;
	border-end-start-radius: 20px;
	box-shadow: 0px -4px 9px 0px rgba(194, 194, 194, 0.25);
	z-index: 1;
}

/* Nav button style */
.menu-link {
	text-decoration: none;
	color: inherit;
	background: none;
	border: none;
	font-size: 25px;
	cursor: pointer;
	display: inline-flex;
	align-items: center;
	gap: 10px;
	color: var(--grey-color);
}

/* Active nav button style */
.menu-link.active {
	color: var(--primary-color);
}

/* Profile image style */
.profile-img {
	width: 30px;
	height: 30px;
	border-radius: 50%;
	margin-right: 10px;
}
</style>
