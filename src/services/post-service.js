// Import axios instance aldready configured for authenticated requests during login
import { authAxios } from "@/services/auth-axios";
import { publicAxios } from "@/services/public-axios";

// Fetch posts by a specific username with pagination support
export const fetchPostsByUsername = async (
	offset = 0,
	limit = 10,
	username
) => {
	try {
		// Authenticated request to fetch posts by username
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

// Fetch a single post by its ID
export const fetchPostById = async (id) => {
	try {
		// Authenticated request to fetch a post by its ID
		const response = await authAxios.get(`/post/${id}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

// Fetch all posts with pagination support
export const fetchAllPosts = async (offset = 0, limit = 10) => {
	try {
		// Public request to fetch all posts
		const response = await publicAxios.get("/posts", {
			params: { offset, limit },
		});

		const { paginator, result } = response.data;

		return { paginator, result };
	} catch (error) {
		console.error("Error fetching all posts:", error);
		throw error;
	}
};

// Delete a post by its ID
export const deletePostById = async (id) => {
	try {
		// Authenticated request to delete a post by its ID
		const response = await authAxios.delete(`/post/${id}`);
		return response.data;
	} catch (error) {
		console.error("Error deleting post:", error);
		throw error;
	}
};

// Create a new post and return its ID
export const createPost = async (content) => {
	try {
		// Authenticated request to create a new post
		const response = await authAxios.post("/post", { content });
		return response.data.id; // Return the ID of the created post
	} catch (error) {
		console.error("Error creating post:", error);
		throw error;
	}
};

// Update an existing post by its ID
export const updatePost = async (id, content) => {
	try {
		// Authenticated request to update an existing post
		await authAxios.put(`/post/${id}`, { content });
	} catch (error) {
		console.error("Error updating post:", error);
		throw error;
	}
};

// *** Current API does not support editing replies, so fetching an indidicual one is not needed ***
// Fetch a reply by its ID within a specific post:
// export async function fetchReplyById(replyId, postId) {
// 	const post = await fetchPostById(postId);
// 	const reply = post.replies?.find((r) => String(r.id) === String(replyId));
// 	if (!reply) {
// 		throw new Error(`Reply with id ${replyId} not found in post ${postId}`);
// 	}
// 	return reply;
// }

// Crete a reply to a post
export const createReply = async (postId, content) => {
	try {
		// Authenticated request to create a reply to a post
		const response = await authAxios.post(`/post/${postId}/reply`, { content });
		return response.data.id; // Return the ID of the created reply
	} catch (error) {
		console.error("Error creating reply:", error);
		throw error;
	}
};
