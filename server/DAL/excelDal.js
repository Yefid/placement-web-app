const jFile = require('jsonfile');
const path = __dirname + '/users.json';
const path2 = __dirname + '/cand5.xlsx';

const xlsx = require('xlsx');

const getExcelData = () => {
	return new Promise((resolve, reject) => {
		let data = {};
		console.log(path2);
		let wb = xlsx.readFile(path2);
		let ws = wb.Sheets['sheet'];
		data = xlsx.utils.sheet_to_json(ws);

		resolve(data);
	});
};

const getExcelDataByid = (id) => {
	return new Promise((resolve, reject) => {
		let wb = xlsx.readFile(path2);
		let ws = wb.Sheets['sheet'];
		let data = xlsx.utils.sheet_to_json(ws);

		resolve(data[id]);
	});
};

module.exports = { getExcelData, getExcelDataByid };
