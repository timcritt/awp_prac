import { ref, computed } from "vue";

//Encapsulates the logic for fetching paginated posts

export function usePaginatedPosts(fetchFunction, fetchArgs = []) {
	const messages = ref([]);
	//Could be extended to accept custom limit, but PRAC specifies limit=10 for all views that consume the composabl
	const offset = ref(0);
	const limit = 10;
	const total = ref(0);
	const loading = ref(false);
	const error = ref(null);

	const canLoadMore = computed(() => messages.value.length < total.value);

	const fetchPosts = async () => {
		loading.value = true;
		try {
			const { paginator, result } = await fetchFunction(
				offset.value,
				limit,
				//spread the fetchArgs to allow for additional parameters
				...fetchArgs
			);
			messages.value.push(...result);
			total.value = paginator.total;
			offset.value += limit;
		} catch (err) {
			error.value = err.message || "Failed to load posts";
		} finally {
			loading.value = false;
		}
	};

	return {
		messages,
		loading,
		error,
		canLoadMore,
		fetchPosts,
	};
}
