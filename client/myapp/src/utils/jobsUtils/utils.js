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
const url = host + 'api/jobs';
const url2 = host + 'api/landingJob';

const getAllJobs = () => {
	return axios.get(url, config());
};

const getJob = (id) => {
	return axios.get(url + '/' + id, config());
};

const addJob = (obj) => {
	return axios.post(url, obj, config());
};

const updateJob = (id, obj) => {
	return axios.put(url + '/' + id, obj, config());
};

const deleteJob = (id) => {
	return axios.delete(url + '/' + id, config());
};

const getJobList = () => {
	return axios.get(url + '/joblist', config());
};
export default {
	getAllJobs,
	getJob,
	addJob,
	updateJob,
	deleteJob,
	getJobList,
};
