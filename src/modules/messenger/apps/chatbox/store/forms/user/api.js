import { restRequest } from 'Helper/http';

// createUser
const createUser = async ({ email, name }) => {
	let args = {};

	if ( email ) {
		args.email = email;
	}

	if ( name ) {
		args.name = name;
	}

	return await restRequest.post("/users", args);
};

const api = { createUser }

export default api;