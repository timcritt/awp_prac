// Import axios instance aldready configured for authenticated requests during login
import { authAxios } from "@/services/auth-axios";

export const fetchPostsByUsername = async (
	offset = 0,
	limit = 10,
	username
) => {
	try {
		const response = await authAxios.get(`/user/${username}/posts`, {
			params: { offset, limit },
		});

		const { paginator, result } = response.data;

		return { paginator, result };
	} catch (error) {
		console.error("Error fetching posts:", error);
		throw error;
	}
};
