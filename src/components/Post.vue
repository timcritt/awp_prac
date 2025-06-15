<script setup>
import { computed, defineProps } from "vue";
import { useRouter } from "vue-router";
import { ROUTES } from "@/router/route-definitions";
import { ICONS } from "@/assets/icons";

//Keep props flat to avoid dependency on the post object structure
// This component can be used to display a post with user information or without it
const props = defineProps({
	id: {
		type: [String, Number],
		required: true,
		default: "",
	},
	username: {
		type: [String, null],
		required: false,
		default: null, // Default to null if no avatar is provided so that it can be conditionally rendered
	},
	name: {
		type: [String, null],
		required: false,
		default: null, // Default to null if no avatar is provided so that it can be conditionally rendered
	},
	surname: {
		type: [String, null],
		required: false,
		default: null, // Default to null if no avatar is provided so that it can be conditionally rendered
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
	nLikes: {
		type: Number,
		required: true,
		default: 0,
	},
	nReplies: {
		type: Number,
		required: false,
	},
	replies: {
		type: Array,
		default: () => [],
	},
	publishDate: {
		type: String,
		required: true,
		default: new Date().toISOString(),
	},
	postId: {
		type: [String, Number],
		required: false,
		default: null, // Default to null if no postId is provided so that it can be conditionally rendered
	},
});

// We could just check this in-line, but using a computed property makes it clearer
const isReply = computed(() => props.postId != null);

const router = useRouter();

function handleNavigateToProfile() {
	if (props.username) {
		router.push(ROUTES.PROFILE(props.username).to);
	}
}

function handleNavigateToPostDetail() {
	if (props.id) {
		router.push(ROUTES.POST_DETAIL(props.id).to);
	}
}
</script>

<template>
	<article class="post">
		<section class="user-info" @click="handleNavigateToProfile">
			<img v-if="avatar" :src="avatar" alt="avatar" class="user-info__avatar" />
			<div class="user-info__user">
				<h2 v-if="name">{{ name }} {{ surname }}</h2>
				<p v-if="username">@{{ username }}</p>
			</div>
		</section>
		<section class="post-detail" @click="handleNavigateToPostDetail">
			<p>{{ content }}</p>
			<time>{{ new Date(publishDate).toLocaleString() }}</time>
		</section>
		<section v-if="{}" class="interactions" @click="handleNavigateToPostDetail">
			<p>{{ ICONS.heart }} {{ nLikes }}</p>
			<!-- Posts that are replies can't have their own replies -->
			<p v-if="!isReply">{{ ICONS.comment }} {{ nReplies }}</p>
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
