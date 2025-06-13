import { authAxios } from "./auth-axios";

export const fetchUser = async (username) => {
	try {
		const response = await authAxios.get(`/user/${username}`);
		return response.data;
	} catch (error) {
		console.error("Error fetching user:", error);
		throw error;
	}
};
