// Import axios instance aldready configured for authenticated requests during login
import { authAxios } from "@/services/auth-axios";
import { publicAxios } from "@/services/public-axios";

export const fetchPostsByUsername = async (
	offset = 0,
	limit = 10,
	username
) => {
	console.log(
		"Token from post-service: ",
		authAxios.defaults.headers.common["Authorization"]
	);
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

export const fetchAllPosts = async (offset = 0, limit = 10) => {
	try {
		const response = await publicAxios.get("/posts", {
			params: { offset, limit },
		});
		console.log(response.data);

		const { paginator, result } = response.data;

		return { paginator, result };
	} catch (error) {
		console.error("Error fetching all posts:", error);
		throw error;
	}
};
