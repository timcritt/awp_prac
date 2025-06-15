<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { createReply } from "@/services/post-service";
import { useSubmitForm } from "@/composables/useSubmitForm";
import { useSessionStore } from "@/stores/session";
import { storeToRefs } from "pinia";
import MessageForm from "@/components/MessageForm.vue";
import { ROUTES } from "../router/route-definitions";

const sessionStore = useSessionStore();
const { profileImg } = storeToRefs(sessionStore);

const router = useRouter();
const route = useRoute();
//The Id of the post to which this reply belongs
const postId = computed(() => route.params.postId || null);
//The Id of the reply being edited, if any
const replyId = computed(() => route.params.id || null);

//Currently, the app only supports creating new replues, not editing existing ones.
const submitHandler = async (content, id) => {
	await createReply(postId.value, content);
	router.push(ROUTES.POST_DETAIL(postId.value).to);
};

// Using the useSubmitForm composable to handle form submission allows for future extensibility.
// For example, if we later decide to support editing replies, we can add a fetch function and the reply id
const { localContent, isSubmitting, submitContent } = useSubmitForm(
	ref(null), // We don't need to fetch the reply by ID for creating a new reply,
	submitHandler,
	null // No fetch function needed, as we are only creating replies
);
</script>

<template>
	<MessageForm
		v-model="localContent"
		placeholder="Write your reply..."
		:disabled="isSubmitting"
		:profile-img="profileImg"
		@submit="submitContent"
	>
		{{ replyId ? "Update Reply" : "Reply" }}
	</MessageForm>
</template>
