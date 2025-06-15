// Centralise the route definitions for the application to ensure consistency and ease of maintenance
// Routes and links can both be created using this object.
// Use the 'to' property to generate links in templates or programmatically navigate in the application.
// use the 'path' and 'name' property for defining routes in the router configuration.

export const ROUTES = {
	HOME: { name: "Home", path: "/", to: { name: "Home" } },
	LOGIN: { name: "Login", path: "/login", to: { name: "Login" } },

	PROFILE: (username = ":username") => ({
		name: "Profile",
		path: `/profile/${username}`,
		to: { name: "Profile", params: { username } },
	}),

	POST_DETAIL: (id = ":id") => ({
		name: "PostDetail",
		path: `/post/${id}`,
		to: { name: "PostDetail", params: { id } },
	}),

	// If Id is passed, page will be rendered in edit mode, otherwise in create mode
	POST_FORM: (id = null) => ({
		name: "PostForm",
		path: `/post/form/:id?`, // keep original definition for the router
		to:
			id != null ? { name: "PostForm", params: { id } } : { name: "PostForm" },
	}),
};
