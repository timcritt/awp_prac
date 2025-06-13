<script setup>
import PostList from "../components/PostList.vue";
import { usePaginatedPosts } from "@/composables/usePaginatedPosts";
import { fetchAllPosts } from "@/services/post-service";
import { onMounted } from "vue";

const { posts, loading, error, canLoadMore, fetchPosts } = usePaginatedPosts(
	fetchAllPosts,
	[]
);

onMounted(async () => {
	await fetchPosts();
	console.log("Posts fetched:", posts);
});
</script>

<template>
	<div class="home">
		<h1 class="title-section">Feed</h1>

		<PostList :posts :loading :canLoadMore :error :fetchPosts />

		<!-- Load more button -->
	</div>
</template>

<style scoped></style>
