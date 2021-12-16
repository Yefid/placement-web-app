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
console.log(host);
const url = host + 'api/landingJob';

//ONLY FOR LANDING PAGE - OPEN TO ALL
const getLandingJob = (id) => {
	return axios.get(url + '/' + id);
};

const addCandidate = (obj) => {
	return axios.post(url, obj, config());
};

export default {
	addCandidate,
	getLandingJob,
};
