const express = require('express');
const router = express.Router();
const jobsdbBL = require('../models/jobs/jobsdbBL');
const candidatesdbBL = require('../models/candidates/candidatesdbBL');
const loginRouter = require('./loginRouter');
const { getRoleFromId, VerifcationStatus } = require('../helpers/auth');

router.route('/:id').get(async (req, resp) => {
	console.log(req.params.id);
	let data = {};
	data = await jobsdbBL.getJob(req.params.id);
	console.log(data);
	const dataForLandingPage = {
		companyToPublish: data.companyToPublish,
		companyDescription: data.companyDescription,
		jobDescriprion: data.jobDescriprion,
		jobRequirements: data.jobRequirements,
		industryId: data.industryId,
		industryName: data.industryName,
		jobNumber: data.jobNumber,
		_id: data._id,
	};
	return resp.json(dataForLandingPage);
});

router.route('/').post(async (req, resp) => {
	let status = {};

	status = await candidatesdbBL.addCandidate(req.body);

	return resp.json(status);
});

module.exports = router;
