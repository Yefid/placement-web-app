const express = require('express');
const router = express.Router();
const usersBL = require('../models/users/usersBL');
const { getRoleFromId, VerifcationStatus } = require('../helpers/auth');
const bcrypt = require('bcryptjs');

//auth - checks token and role
const restrictto = async (req, res, next) => {
	var token = req.headers['x-access-token'];

	let respCallBack = async (resp) => {
		const resp2 = await resp;
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

router.route('/').get(async (req, resp) => {
	let data = {};
	['Admin'].includes(resp.role)
		? (data = await usersBL.getUsers())
		: (data = { status: 401, message: 'unauthorized' });

	return resp.json(data);
});

router.route('/').post(async (req, resp) => {
	const saltRounds = 10;

	bcrypt.genSalt(saltRounds, function (err, salt) {
		bcrypt.hash(req.body.password, salt, async function (err, hash) {
			let data = { ...req.body, password: hash };

			let status = await usersBL.addUser(data);
			return resp.json(status);
		});
	});
});

router.route('/:id').put(async (req, resp) => {
	const saltRounds = 10;

	bcrypt.genSalt(saltRounds, function (err, salt) {
		bcrypt.hash(req.body.password, salt, async function (err, hash) {
			let data = { ...req.body, password: hash };

			let status = await usersBL.updateUser(req.body.id, data);
			return resp.json(status);
		});
	});
});

module.exports = router;
