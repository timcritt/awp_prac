import { authAxios } from "@/services/auth-axios";

//Set the header for the axios request with the token
function setAuthHeader(token) {
	authAxios.defaults.headers.common["Authorization"] = token;
}

function clearAuthHeader() {
	delete authAxios.defaults.headers.common["Authorization"];
}

function setupAuthInterceptor(onUnauthorized) {
	//Invert the dependency by passing the callback
	if (authAxios._hasAuthInterceptor) return;

	authAxios.interceptors.response.use(
		(res) => res,
		(err) => {
			if (err.response?.status === 401) {
				onUnauthorized?.();
			}
			return Promise.reject(err);
		}
	);

	authAxios._hasAuthInterceptor = true;
}

export async function login(username, password) {
	try {
		const res = await authAxios.post("/login", { username, password });

		const { token, user } = res.data;

		localStorage.setItem("token", token);
		localStorage.setItem("username", user.username);
		setAuthHeader(token);
		console.log("Login successful:");

		return {
			token,
			username: user.username,
			name: user.name,
			surname: user.surname,
		};
	} catch (err) {
		clearAuthHeader();

		const message = err.message || "Login failed";
		throw new Error(message);
	}
}

export async function fetchUser(username) {
	try {
		const res = await authAxios.get(`/user/${username}`);
		return { name: res.data.name, surname: res.data.surname };
	} catch (err) {
		console.log(
			`Failed to fetch user ${username}:`,
			err.response?.data || err.message
		);
		throw new Error(err.response?.data?.message || "Unable to fetch user");
	}
}

export function restoreAuth() {
	const token = localStorage.getItem("token");
	const username = localStorage.getItem("username");

	if (token && username) {
		console.log("Restoring authentication for user:", username);
		console.log("Restoring authentication with Token:", token);
		setAuthHeader(token);
		return { token, username };
	}

	return null;
}

export function clearAuth() {
	localStorage.removeItem("token");
	localStorage.removeItem("username");
	clearAuthHeader();
}

export { setupAuthInterceptor };
