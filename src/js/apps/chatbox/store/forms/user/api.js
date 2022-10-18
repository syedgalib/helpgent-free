import http from 'Helper/http';

// createUser
const createUser = async ({ email, name }) => {
	let args = {};

	if ( email ) {
		args.email = email;
	}

	if ( name ) {
		args.name = name;
	}

	return await http.postData("/users", args);
};

const api = { createUser }

export default api;