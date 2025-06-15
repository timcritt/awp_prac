<script setup>
//State management
import { ref, computed, onMounted, watch } from "vue";
import { useSessionStore } from "@/stores/session";
import { storeToRefs } from "pinia";

// API Services
import { fetchPostById, createPost, updatePost } from "@/services/post-service";

//Routing
import { useRoute, useRouter } from "vue-router";
import { ROUTES } from "@/router/route-definitions";

const sessionStore = useSessionStore();
const { profileImg } = storeToRefs(sessionStore);

const router = useRouter();
const route = useRoute();
const postId = computed(() => route.params.id || null);

const localContent = ref("");
const isSubmitting = ref(false);

// Check if we are in edit mode by checking if postId is not null. Use computed to reactively update this value when switching between edit and create routes
const isInEditMode = computed(() => !!postId.value);

async function loadPost(id) {
	// If no ID is avaiable, component is in create mode, so we do not need to fetch any post
	if (id) {
		const { content } = await fetchPostById(id);
		localContent.value = content;
	} else {
		localContent.value = "";
	}
}

async function submitPost() {
	// Prevent multiple submissions in quick succession
	if (isSubmitting.value) return;

	// Prevent submission if content is empty
	const content = localContent.value.trim();
	if (!content) {
		console.warn("Content is empty");
		return;
	}

	isSubmitting.value = true;

	try {
		if (isInEditMode.value) {
			await updatePost(postId.value, content);
			router.push(ROUTES.POST_DETAIL(postId.value).to);
		} else {
			const newPostId = await createPost(content);
			router.push(ROUTES.POST_DETAIL(newPostId).to);
		}
	} catch (error) {
		console.error("Error submitting post:", error);
	} finally {
		isSubmitting.value = false;
	}
}

// Try to load the post when the component is mounted
onMounted(() => {
	loadPost(postId.value);
});

// Watch for changes in postId to load the post when the route changes
watch(postId, async (newId) => {
	await loadPost(newId);
});
</script>

<template>
	<div class="form-post">
		<img class="form-post__image" :src="profileImg" alt="User profile image" />
		<form class="form-post__form">
			<textarea
				:placeholder="
					isInEditMode ? 'Edit your post...' : 'What\'s on your mind?'
				"
				v-model="localContent"
				rows="3"
			>
			</textarea>
			<button
				class="btn btn--share"
				type="submit"
				@click.prevent="submitPost(localContent)"
			>
				{{ isInEditMode ? "Update Post" : "Share" }}
			</button>
		</form>
	</div>
</template>
<style scoped>
/* Post form main container */
.form-post {
	display: flex;
	flex-direction: row;
	padding: 10px;
	border: 1px solid #ddd;
	border-radius: 8px;
	background-color: #fff;
	position: relative;
}

/* Image of the user */
.form-post__image {
	width: 30px;
	height: 30px;
	border-radius: 50%;
}

/* Form */
.form-post__form {
	flex: 1;
}

.form-post__form .btn--share {
	justify-self: flex-end;
}

.form-post__form textarea {
	display: block;
	width: 100%;
	padding: 10px;
	border: 0;
	resize: none;
}
</style>
