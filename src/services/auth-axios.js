import axios from "axios";
import { API_BASE_URL } from "@/config/api-config";

// This file sets up an Axios instance for authenticated requests
// The token will be set in the headers during login
// It should be used for all API calls that require authentication
export const authAxios = axios.create({
	baseURL: API_BASE_URL, // Replace with your API base URL
});
