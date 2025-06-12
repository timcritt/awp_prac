<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { fetchPostsByUsername } from "@/services/post-service";
import { usePaginatedPosts } from "@/composables/usePaginatedPosts";

const route = useRoute();
const username = route.params.username;

// Offset for pagination, starting at 0
const offset = ref(0);
//Request posts in groups of 10
const limit = 10;
// Track the total number of posts so we know when to deactivate the "Load more" button
const total = ref(0);

//Use a composable to handle pagination logic. Pass in the fetch function and parameters
const { messages, loading, error, canLoadMore, fetchPosts } = usePaginatedPosts(
	fetchPostsByUsername,
	[username]
);

//Call
onMounted(fetchPosts);
</script>

<template>
	<div class="profile">
		<h1>Profile Page</h1>
		<p>
			Posts by <strong>{{ route.params.username }}</strong
			>:
		</p>

		<div v-if="loading && messages.length === 0">Loading...</div>
		<div v-else-if="error">{{ error }}</div>

		<div v-else>
			<ul>
				<li v-for="msg in messages" :key="msg.id">
					<p>
						<strong>{{ msg.publishDate }}</strong>
					</p>
					<p>{{ msg.content }}</p>
				</li>
			</ul>

			<p v-if="messages.length === 0">No posts found.</p>

			<!-- Load more button -->
			<button v-if="canLoadMore" @click="fetchPosts" :disabled="loading">
				{{ loading ? "Loading..." : "Load more posts" }}
			</button>
			<p v-else>No more posts to load.</p>
		</div>
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
