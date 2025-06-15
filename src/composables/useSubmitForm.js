// useSubmitForm.js
import { ref, onMounted, watch } from "vue";

export function useSubmitForm(idRef, submitHandler, fetchFn) {
	const localContent = ref("");
	const isSubmitting = ref(false);

	async function loadContent(id) {
		if (id) {
			const { content } = await fetchFn(id);
			localContent.value = content;
		} else {
			localContent.value = "";
		}
	}

	async function submitContent() {
		if (isSubmitting.value) return;

		const content = localContent.value.trim();
		if (!content) {
			console.warn("Content is empty");
			return;
		}

		isSubmitting.value = true;
		try {
			await submitHandler(content, idRef.value);
		} finally {
			isSubmitting.value = false;
		}
	}

	onMounted(() => loadContent(idRef.value));
	watch(idRef, loadContent);

	return {
		localContent,
		isSubmitting,
		submitContent,
	};
}
