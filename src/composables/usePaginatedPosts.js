import { ref, computed } from "vue";

// Composable to handle paginated posts fetching
// Arguments: fetchFunction - The function to call for fetching posts.
// Returns:  1. fetchPaginatedPosts function that can be called with dynamic arguments.
//           2. reactive properties and methods for managing pagination.

//Lesson learned:
//     Bad: Pass the args of fetchFunction to usePaginatedPosts on instantiation of the composable -> Can lead to stale state/closure
//     Good: Pass the args to fetchPaginatedPosts when you call it at the component level-> latest value used!

export function usePaginatedPosts(fetchFunction) {
	const posts = ref([]);
	const offset = ref(0);
	const limit = 10;
	const total = ref(0);
	const loading = ref(false);
	const error = ref("");

	const canLoadMore = computed(() => posts.value.length < total.value);

	const fetchPaginatedPosts = async (...args) => {
		loading.value = true;
		try {
			const { paginator, result } = await fetchFunction(
				offset.value,
				limit,
				...args // dynamic call args!
			);
			//Append new posts to the existing list
			posts.value.push(...result);
			//Update total count and offset for next fetch
			total.value = paginator.total;
			offset.value += limit;
		} catch (err) {
			error.value = err.message || "Failed to load posts";
		} finally {
			loading.value = false;
		}
	};

	return {
		posts,
		loading,
		error,
		canLoadMore,
		fetchPaginatedPosts,
	};
}
