import axios from 'axios';

let host = 'http://localhost:8000/';
if (process.env.NODE_ENV == 'production') {
	host = 'https://placementcompany-server.herokuapp.com/';
}
const url = host + 'api/login';

const login = (email, password) => {
	return axios.post(url, { email, password });
};

const saveToken = (token, email) => {
	sessionStorage['token'] = token;
	sessionStorage['email'] = email;
};

const getRole = async () => {
	let config = {
		headers: {
			'x-access-token': sessionStorage['token'],
		},
	};
	return await axios.get(url + '/usersrole', config);
};

export default { login, saveToken, getRole };
