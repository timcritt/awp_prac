import axios from "axios";

export const authAxios = axios.create({
	baseURL: "http://localhost:3000", // Replace with your API base URL
});
