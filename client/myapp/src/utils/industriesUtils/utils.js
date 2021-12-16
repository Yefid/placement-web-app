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
const url = host + 'api/industries';

const getAllIndustries = () => {
	return axios.get(url, config());
};

const getIndustry = (id) => {
	return axios.get(url + '/' + id, config());
};

export default {
	getAllIndustries,
	getIndustry,
};
