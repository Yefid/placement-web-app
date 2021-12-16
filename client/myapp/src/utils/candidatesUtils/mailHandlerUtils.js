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
const url = host + 'api/candidatesMailer';

const sendMail = (obj) => {
	return axios.post(url, obj, config());
};

const getAttachments = () => {
	return axios.get(url + '/getAttachments', config());
};

export default {
	sendMail,
	getAttachments,
};
