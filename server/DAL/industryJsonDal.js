const jFile = require('jsonfile');
const path = __dirname+'/industry.json';

const getJsonIndustries = () => {
	return new Promise((resolve, reject) => {
		jFile.readFile(path, (err, data) => {
			if (err) reject(err);
			else resolve(data);
		});
	});
};

module.exports = { getJsonIndustries };
