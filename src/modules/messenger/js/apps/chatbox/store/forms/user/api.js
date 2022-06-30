import { restRequest } from 'Helper/http';

// createUser
const createUser = async ( args ) => {
	let args = {};

	return await restRequest.post("/users", args);
};

const api = { createUser }

export default api;