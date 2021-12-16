const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { getRoleFromId, VerifcationStatus } = require('../helpers/auth');

//auth - checks token and role
const restrictto = async (req, res, next) => {
	var token = req.headers['x-access-token'];

	let respCallBack = async (resp) => {
		console.log('in download');
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

router.route('/:id').get(async (req, resp) => {
	var file = req.params.id;

	let fileLocation = path.join(__dirname, '../CVs', file);

	console.log(fileLocation);

	if (['Admin', 'BD'].includes(resp.role)) {
		fs.readFile(fileLocation, function (err, content) {
			if (err) {
				resp.writeHead(404, { 'Content-type': 'text/html' });
				resp.end('<h1>No such image</h1>');
			} else {
				resp.download(fileLocation, file);
			}
		});
	} else {
		let status = { status: 401, message: 'unauthorized' };
		resp.json(status);
	}
});

router.route('/drive/:id').get(async (req, resp) => {
	var file = req.params.id;

	console.log(file);
	resp.json({ id: file });
});

module.exports = router;
