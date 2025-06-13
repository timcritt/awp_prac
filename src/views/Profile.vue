<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

// Import fetch function and pagination composable for fetching posts
import { fetchPostsByUsername } from "@/services/post-service";
import { usePaginatedPosts } from "@/composables/usePaginatedPosts";

// Custom components
import PostList from "../components/PostList.vue";

// Global authentication store
import { useSessionStore } from "@/stores/session";

// Import user service to fetch user data associated with the profile
import { fetchUser } from "@/services/user-service";

const sessionStore = useSessionStore();

// Logout function to clear session and redirect to login
const { logout } = sessionStore;

const route = useRoute();
const profileUsername = route.params.username;

const userData = ref(null);

// Fetch posts associated with the profile username
const { posts, loading, error, canLoadMore, fetchPosts } = usePaginatedPosts(
	fetchPostsByUsername,
	[profileUsername]
);

onMounted(async () => {
	userData.value = await fetchUser(profileUsername);
	console.log("User fetched:", userData);
	await fetchPosts();
	console.log("Posts fetched:", posts);
});
</script>

<template>
	<div class="profile">
		<div v-if="userData" class="user-info">
			<img
				class="user-info__avatar"
				:src="userData.profileImg"
				alt="User Avatar"
			/>
			<p>{{ userData.name }} {{ userData.surname }}</p>
			<p>@{{ userData.username }}</p>
			<p>{{ userData.bio }}</p>
			<p>
				Joined in <time>{{ userData.registrationDate }}</time>
			</p>

			<button class="btn--logout" @click="logout">Logout</button>
		</div>

		<PostList :posts :loading :canLoadMore :error :fetchPosts />

		<div v-if="loading && posts.length === 0">Loading...</div>
		<div v-else-if="error">{{ error }}</div>
	</div>
</template>

<style scoped>
/* Header of the profile page */
.user-info {
	display: grid;
	place-items: center;
	padding-bottom: 10px;
	border-bottom: 1px solid #ddd;
	position: relative;
}

/* Avatar */
.user-info__avatar {
	width: 100px;
	height: 100px;
	border-radius: 50%;
}

/* Logout button */
.btn--logout {
	position: absolute;
	top: 10px;
	right: 10px;
	border: none;
	font-size: 20px;
	cursor: pointer;
}
</style>
