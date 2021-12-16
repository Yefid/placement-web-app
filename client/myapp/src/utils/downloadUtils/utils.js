import axios from 'axios';

let config = () => {
	console.log({ 'x-access-token': sessionStorage['token'] });
	return {
		headers: {
			'x-access-token': sessionStorage['token'],
		},
		responseType: 'blob',
	};
};

let host = 'http://localhost:8000/';
if (process.env.NODE_ENV == 'production') {
	host = 'https://placementcompany-server.herokuapp.com/';
}
const url = host + 'api/download';

const downloadFile = (id) => {
	console.log('downloading file with id: ' + id);
	return axios.get(url + '/' + id, config());
};

const displayFileFromGoogleDrive = (id) => {
	console.log('downloading file with id: ' + id);
	return axios.get(url + '/drive/' + id, config());
};

export default {
	downloadFile,
	displayFileFromGoogleDrive,
};
