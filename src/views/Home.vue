<script setup>
import { onMounted } from "vue";
import { useSessionStore } from "@/stores/session";
import { usePaginatedPosts } from "@/composables/usePaginatedPosts";
import { fetchAllPosts } from "@/services/post-service";

const sessionStore = useSessionStore();

const { messages, loading, error, canLoadMore, fetchPosts } = usePaginatedPosts(
	fetchAllPosts,
	[]
);

onMounted(() => {
	fetchPosts();
});
</script>

<template>
	<div class="home">
		<h1>Welcome to KwikPost</h1>
		{{ sessionStore.isAuthenticated }}
		<p>This is the home page.</p>
		<!-- Display the posts fetched from the API -->
		<div v-if="!loading && messages.length > 0">
			<ul>
				<li v-for="msg in messages" :key="msg.id">
					<p>
						<strong>{{ msg.publishDate }}</strong>
					</p>
					<p>{{ msg.content }}</p>
				</li>
			</ul>
		</div>

		<!-- Load more button -->
		<button v-if="canLoadMore" @click="fetchPosts" :disabled="loading">
			{{ loading ? "Loading..." : "Load more posts" }}
		</button>
		<p v-else>No more posts to load.</p>

		<div v-if="loading && messages.length === 0">Loading posts...</div>

		<p v-if="loading">Loading posts...</p>
		<p v-if="error">{{ error }}</p>
	</div>
</template>

<style scoped>
.home {
	padding: 2rem;
	text-align: center;
}
</style>
