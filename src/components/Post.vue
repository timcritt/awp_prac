<script setup>
import { defineProps } from "vue";

//Keep props flat to avoid dependency on the post object structure
const props = defineProps({
	username: {
		type: [String, null],
		required: false,
		default: null,
	},
	name: {
		type: [String, null],
		required: false,
		default: null,
	},
	surname: {
		type: [String, null],
		required: false,
		default: null,
	},
	avatar: {
		type: [String, null],
		required: false,
		default: null, // Default to null if no avatar is provided so that it can be conditionally rendered
	},
	content: {
		type: String,
		required: true,
		default: "Post content goes here.",
	},
	likes: {
		type: Number,
		required: true,
		default: 0,
	},
	replies: {
		type: Number,
		required: true,
		default: 0,
	},
	publishDate: {
		type: String,
		required: true,
		default: new Date().toISOString(),
	},
});
</script>

<template>
	<article class="post">
		<section class="user-info">
			<img v-if="avatar" :src="avatar" alt="avatar" class="user-info__avatar" />
			<div class="user-info__user">
				<h2 v-if="name">{{ name }} {{ surname }}</h2>
				<p v-if="username">@{{ username }}</p>
			</div>
		</section>
		<section class="post-detail">
			<p>{{ content }}</p>
			<time>{{ new Date(publishDate).toLocaleString() }}</time>
		</section>
		<section class="interactions">
			<p>Likes: {{ likes }}</p>
			<p>Replies: {{ replies }}</p>
		</section>
	</article>
</template>

<style scoped>
/* Post container */
.post {
	display: flex;
	flex-direction: column;
	padding: 10px;
	background-color: #fff;
	position: relative;
	cursor: pointer;
}

/* Link inside a post */
.post a {
	text-decoration: none;
	color: inherit !important;
}

/* Post user info container */
.user-info {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 10px;
	margin-bottom: 10px;
}

.user-info__user {
	display: flex;
	flex-direction: column;
}

.user-info__avatar {
	width: 50px;
	height: 50px;
	border-radius: 50%;
}

/* Post content container */
.post-detail {
	margin-bottom: 10px;
}

.post-detail p {
	margin: 0;
	font-size: 14px;
}

.post-detail time {
	font-size: 12px;
}

/* Contains likes and replies count and buttons*/
.interactions {
	display: flex;
	justify-content: flex-start;
	gap: 10px;
}

.interactions .icon {
	font-size: 12px;
	color: #555;
}
</style>
