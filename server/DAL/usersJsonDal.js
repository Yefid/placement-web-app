const jFile = require('jsonfile');
const path = __dirname+'/users.json';

const getJsonUsers = () => {
	return new Promise((resolve, reject) => {
		jFile.readFile(path, (err, data) => {
			if (err) reject(err);
			else resolve(data);
		});
	});
};

const addJsonUser = (obj) => {
	return new Promise((resolve, reject) => {
		jFile.writeFile(path, obj, (err) => {
			if (err) reject(err);
			else resolve('ok');
		});
	});
};

module.exports = { getJsonUsers, addJsonUser };
