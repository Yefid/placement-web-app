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
const url = host + 'api/jobcontacts';

const getAllJobContacts = () => {
	return axios.get(url, config());
};

const getJobContact = (id) => {
	return axios.get(url + '/' + id, config());
};

const addJobContact = (obj) => {
	return axios.post(url, obj, config());
};

const updateJobContact = (id, obj) => {
	return axios.put(url + '/' + id, obj, config());
};

const deleteJobContact = (id) => {
	return axios.delete(url + '/' + id, config());
};

const getJobContactList = () => {
	return axios.get(url + '/jobContactlist', config());
};
export default {
	getAllJobContacts,
	getJobContact,
	addJobContact,
	updateJobContact,
	deleteJobContact,
	getJobContactList,
};
