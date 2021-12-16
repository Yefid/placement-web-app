const express = require('express');
const router = express.Router();
const candidatesdbBL = require('../models/candidates/candidatesdbBL');
const candidateExcelBL = require('../models/candidates/candidateExcelBL');

router.route('/').get(async (req, resp) => {
	let data = {};
	for (let index = 0; index < 1; index++) {
		let candidateData = await candidateExcelBL.getExcelDataByid(index);
		console.log(candidateData);
		const shapedData = {
			wantedJobs: candidateData.wantedJobs
				? candidateData.wantedJobs.split(',')
				: [],
			certificates: candidateData.certificates
				? candidateData.certificates.split(',')
				: [],
			requiredJobScale: candidateData.requiredJobScale
				? candidateData.requiredJobScale.split(',')
				: [],
			requiredJobAreas: candidateData.requiredJobAreas
				? candidateData.requiredJobAreas.split(',')
				: [],
			pastRoles: candidateData.pastRoles
				? candidateData.pastRoles.split(',')
				: [],
			pastFieldOfActivity: candidateData.pastFieldOfActivity
				? candidateData.pastFieldOfActivity.split(',')
				: [],
			fromWhere: candidateData.fromWhere
				? (candidateData.fromWhere + '').split(',') //make it a string then split it to array
				: [],
			name: candidateData.name ? candidateData.name : '',
			email: candidateData.email ? candidateData.email : '',
			phone: candidateData.phone ? candidateData.phone : '',
			offers: false,
			birthDate: candidateData.birthDate ? candidateData.birthDate : '',
			salaryExpectations: candidateData.salaryExpectations
				? candidateData.salaryExpectations
				: '',
		};

		console.log(shapedData);
		const resp2 = await candidatesdbBL.addCandidate(shapedData);
		console.log(resp2);
	}

	return resp.json(data);
});

module.exports = router;
