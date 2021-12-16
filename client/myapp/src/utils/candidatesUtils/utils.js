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
const url = host + 'api/candidates';

const getLimitedCandidates = () => {
	return axios.get(url + '/limited', config());
};

const getAllCandidates = () => {
	return axios.get(url, config());
};

const getCandidate = (id) => {
	return axios.get(url + '/' + id, config());
};

const addCandidate = (obj) => {
	return axios.post(url, obj, config());
};

const addCandidateFromMail = (obj) => {
	return axios.post(url + '/addCandidateFromMail', obj, config());
};

const updateCandidate = (id, obj) => {
	return axios.put(url + '/' + id, obj, config());
};

const deleteCandidate = (id) => {
	return axios.delete(url + '/' + id, config());
};

export default {
	getLimitedCandidates,
	getAllCandidates,
	getCandidate,
	addCandidate,
	updateCandidate,
	deleteCandidate,
	addCandidateFromMail,
};
