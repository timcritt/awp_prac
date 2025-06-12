import axios from "axios";

// This file sets up an Axios instance for authenticated requests
// The token will be set in the headers during login
// It shgould be used for all API calls that require authentication
export const authAxios = axios.create({
	baseURL: "http://localhost:3000", // Replace with your API base URL
});
