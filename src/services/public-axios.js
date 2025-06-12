import axios from "axios";

import { API_BASE_URL } from "@/config/api-config";

// This file sets up an Axios instance for public requests
// It does not include any authentication headers
// It should be used for API calls that do not require authentication
export const publicAxios = axios.create({
	baseURL: API_BASE_URL,
});
