<script setup>
import { onMounted, computed, ref } from "vue";
import { fetchPostById } from "@/services/post-service";
import { useRoute, useRouter } from "vue-router";
import Post from "@/components/Post.vue";
import { ICONS } from "@/assets/icons";
import { useSessionStore } from "@/stores/session";
import { storeToRefs } from "pinia";
import { deletePostById } from "../services/post-service";
import { ROUTES } from "@/router/route-definitions";

const route = useRoute();
const sessionStore = useSessionStore();
const { username, isAuthenticated } = storeToRefs(sessionStore);

const id = computed(() => Number(route.params.id));

const post = ref(null);
const replies = ref([]);

const router = useRouter();

onMounted(async () => {
	try {
		post.value = await fetchPostById(id.value);
	} catch (error) {
		console.error("Error fetching post:", error);
	}

	if (post.value && post.value?.nReplies > 0) {
		replies.value = post.value.replies || [];
	}
});

async function handleDeletePost() {
	await deletePostById(id.value);
	// After deletion, redirect to home
	router.push(ROUTES.HOME.to);
}

async function handleClickEditPost() {
	// Redirect to form page, passing the post ID
	router.push(ROUTES.POST_FORM(id.value).to);
}

async function handleClickReply() {
	// Redirect to reply form, passing the post ID
	router.push(ROUTES.REPLY_FORM(id.value).to);
}
function handleClickEditReply(replyId) {
	router.push(ROUTES.REPLY_FORM(id.value, replyId).to);
}
</script>

<template>
	<div class="main-post">
		<!-- The main post -->
		<Post
			v-if="post"
			:id="post.id"
			:name="post.user?.name"
			:surname="post.user?.surname"
			:username="post.user?.username"
			:avatar="post.user?.profileImg"
			:publishDate="post.publishDate"
			:content="post.content"
			:nLikes="post.nLikes"
			:nReplies="post.nReplies"
		/>
	</div>

	<div class="actions-wrapper">
		<!-- Only authenticated users who own the post can delete -->
		<a
			v-if="post?.user?.username === username"
			@click="handleDeletePost"
			class="btn btn--cta btn--circle"
			>{{ ICONS.delete }}</a
		>
		<!-- Only authenticated users who own the post can edit -->
		<a
			v-if="post?.user?.username === username"
			@click="handleClickEditPost"
			class="btn btn--cta btn--circle"
			>{{ ICONS.edit }}</a
		>
		<!-- All authenticated users can reply to the post. The route is already guarded, but better to check here too -->
		<a
			v-if="isAuthenticated"
			@click="handleClickReply"
			class="btn btn--cta btn--circle"
			>{{ ICONS.comment }}</a
		>
	</div>

	<!-- The replies associated with the post -->
	<ul class="replies-list">
		<li v-for="reply in replies" :key="reply.id">
			<Post
				:id="reply.id"
				:name="reply.user?.name"
				:surname="reply.user?.surname"
				:username="reply.user?.username"
				:avatar="reply.user?.profileImg"
				:publishDate="reply.publishDate"
				:content="reply.content"
				:nLikes="reply.nLikes"
				:postId="reply.postId"
			/>
		</li>
	</ul>
</template>

<style scoped>
/* Post style in this view */
.main-post {
	border: 1px solid #ddd;
	border-radius: 20px;
	overflow: hidden; /*Added by Tim: ensures content does not overflow the border radius*/
}

/* Wrapper for actions like remove post or edit post */
.actions-wrapper {
	display: flex;
	justify-content: flex-end;
	gap: 20px;
	margin-top: 10px;
	margin-right: 10px;
}

/* Replies list style */
.replies-list {
	margin-left: 20px;
}

.replies-list li:not(:last-child) {
	border-bottom: 1px solid #ddd;
}
</style>
