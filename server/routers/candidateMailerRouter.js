const express = require('express');
const router = express.Router();
const candidateMailerBL = require('../models/candidates/candidateMailerBL');
const { getRoleFromId, VerifcationStatus } = require('../helpers/auth');

//auth - checks token and role
const restrictto = async (req, res, next) => {
	var token = req.headers['x-access-token'];

	let respCallBack = async (resp) => {
		console.log('in');
		const resp2 = await resp;
		console.log(resp2);
		if (resp2.auth) {
			res.role = resp2.userRole;
			next();
		} else {
			res.status(resp2.status).send({ userRole: resp2.userRole });
		}
	};

	await VerifcationStatus(token, respCallBack);
};

router.use(restrictto);

router.route('/').post(async (req, resp) => {
	let status = {};
	if (['Admin', 'BD'].includes(resp.role)) {
		try {
			status = await candidateMailerBL.sendMail(req.body);
		} catch (err) {
			status = { status: 0, message: 'error sending mail' };
		}
	} else {
		status = { status: 401, message: 'unauthorized' };
	}

	console.log(status);
	return resp.json(status);
});

router.route('/getAttachments').get(async (req, resp) => {
	let status = {};
	if (['Admin', 'BD'].includes(resp.role)) {
		try {
			let response = await candidateMailerBL.listMessages();
			status = { response };
		} catch (err) {
			console.log(err);
			status = { status: 0, message: 'error getting list' };
		}
	} else {
	}

	return resp.json(status);
});

module.exports = router;
