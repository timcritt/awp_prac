<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ROUTES } from "@/router/route-definitions";
import { createPost, updatePost, fetchPostById } from "@/services/post-service";
import { useSubmitForm } from "@/composables/useSubmitForm";
import { useSessionStore } from "@/stores/session";
import { storeToRefs } from "pinia";
import MessageForm from "@/components/MessageForm.vue";

const sessionStore = useSessionStore();
const { profileImg } = storeToRefs(sessionStore);

const router = useRouter();
const route = useRoute();
const postId = computed(() => route.params.id || null);

const submitHandler = async (content, id) => {
	if (id) {
		await updatePost(id, content);
		router.push(ROUTES.POST_DETAIL(id).to);
	} else {
		const newId = await createPost(content);
		router.push(ROUTES.POST_DETAIL(newId).to);
	}
};

const { localContent, isSubmitting, submitContent } = useSubmitForm(
	postId,
	submitHandler,
	fetchPostById
);
</script>

<template>
	<MessageForm
		v-model="localContent"
		:placeholder="postId ? 'Edit your post...' : 'What\'s on your mind?'"
		:disabled="isSubmitting"
		:profile-img="profileImg"
		@submit="submitContent"
	>
		{{ postId ? "Update Post" : "Share" }}
	</MessageForm>
</template>
