<script setup>
import Post from "@/components/Post.vue";

defineProps({
	posts: {
		type: Array,
		default: () => [],
		required: true,
	},
	loading: {
		type: Boolean,
		default: false,
		required: true,
	},
	error: {
		type: String,
		default: "",
		required: true,
	},
	canLoadMore: {
		type: Boolean,
		default: false,
		required: true,
	},
	fetchPosts: {
		type: Function,
		required: true,
	},
});
</script>

<template>
	<div class="post-list">
		<div v-for="post in posts" class="post">
			<Post
				:key="post.id"
				:name="post.user?.name"
				:surname="post.user?.surname"
				:username="post.user?.username"
				:avatar="post.user?.profileImg"
				:publishDate="post.publishDate"
				:content="post.content"
				:likes="post.nLikes"
				:replies="post.nReplies"
			/>
		</div>
	</div>
	<button
		class="btn load-more btn--cta"
		v-if="canLoadMore"
		@click="fetchPosts"
		:disabled="loading"
	>
		Load more
	</button>

	<div v-if="loading && posts.length === 0">Loading posts...</div>

	<p v-if="error">{{ error }}</p>
</template>

<style scoped>
/* Posts list container */
.posts-list {
	flex: 1;
	display: flex;
	flex-direction: column;
}

/* Post container */

.post {
	margin-top: 10px;
}

.post:not(:last-child) {
	border-bottom: 1px solid #ddd;
	padding-bottom: 20px;
}

/* Load more posts button */
.btn.load-more {
	margin: 10px auto;
	min-width: 200px;
}
</style>
