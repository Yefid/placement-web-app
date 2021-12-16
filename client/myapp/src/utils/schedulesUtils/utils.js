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
const url = host + 'api/schedule';

const getAllSchedules = () => {
	return axios.get(url, config());
};

const getSchedule = (id) => {
	return axios.get(url + '/' + id, config());
};

const addSchedule = (obj) => {
	return axios.post(url, obj, config());
};

const updateSchedule = (id, obj) => {
	return axios.put(url + '/' + id, obj, config());
};

const deleteSchedule = (id) => {
	return axios.delete(url + '/' + id, config());
};

export default {
	getAllSchedules,
	getSchedule,
	addSchedule,
	updateSchedule,
	deleteSchedule,
};
