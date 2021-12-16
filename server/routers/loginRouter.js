const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
const usersBL = require('../models/users/usersBL');
const { getRoleFromId, VerifcationStatus } = require('../helpers/auth');
const bcrypt = require('bcryptjs');

const restrictto = (req, res, next) => {
	next();
};

const validateEmailAndPassword = async (email, password) => {
	const allUsers = await usersBL.getUsers();
	const user = allUsers.find((x) => email == x.email);
	console.log('user');

	console.log(user);
	const match = await bcrypt.compare(password, user.password);

	if (match) {
		console.log('match');
		const resp = {
			isValid: user?.id ? true : false,
			role: user?.role ? user.role : '',
			id: user?.id ? user.id : '',
		};
		return resp;
	}
	console.log(user);
};

router.get('/posts', function (req, res) {
	var token = req.headers['x-access-token'];
	//Get the real secret key from db or envinroment variable..
	const RSA_PRIVATE_KEY = 'somekey';

	if (!token)
		return res.status(401).send({ auth: false, message: 'No token provided.' });

	jwt.verify(token, RSA_PRIVATE_KEY, async function (err, decoded) {
		if (err)
			return res
				.status(500)
				.send({ auth: false, message: 'Failed to authenticate token.' });

		res.status(200).send([{ name: 'car' }, { name: 'phone' }]);
	});
});

router.post('/', async function (req, res) {
	const email = req.body.email;
	const password = req.body.password;
	const { isValid, role, id } = await validateEmailAndPassword(email, password);

	console.log(isValid, ' ' + role);
	if (isValid) {
		const userId = id;
		const userRole = role;

		//Get the real secret key from db or envinroment variable..
		const RSA_PRIVATE_KEY = 'somekey';

		let tokenData = jwt.sign(
			{ id: userId },
			RSA_PRIVATE_KEY,
			{ expiresIn: 7200 } // expires in 2 hours
		);
		res.status(200).send({ token: tokenData, role: userRole });
	} else {
		res.sendStatus(401);
	}
});

router.get('/usersrole', async function (req, res) {
	var token = req.headers['x-access-token'];
	let respCallBack = async (resp) => {
		const resp2 = await resp;
		res.status(resp2.status).send({ userRole: resp2.userRole });
	};

	await VerifcationStatus(token, respCallBack);
});

module.exports = router;
