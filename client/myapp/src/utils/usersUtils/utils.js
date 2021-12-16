import axios from 'axios';

let config = () => {
	return {
		headers: {
			'x-access-token': sessionStorage['token'],
		},
	};
};

let host = 'http://localhost:8000/';
if (process.env.NODE_ENV == 'production') {
	host = 'https://placementcompany-server.herokuapp.com/';
}
const url = host + 'api/users';

const getAllUsers = () => {
	return axios.get(url, config());
};

const getUser = (id) => {
	return axios.get(url + '/' + id, config());
};

const addUser = (obj) => {
	return axios.post(url, obj, config());
};

const updateUser = (id, obj) => {
	return axios.put(url + '/' + id, obj, config());
};

const deleteUser = (id) => {
	return axios.delete(url + '/' + id, config());
};


export default {
	getAllUsers,
	getUser,
	addUser,
	updateUser,
	deleteUser,
};
