const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
var reader = require('any-text');

const googleDriveHandler = require('../helpers/googleDriveHandler');
var mime = require('mime-types');

const { google } = require('googleapis');
const fs = require('fs');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'CVs');
	},
	filename: (req, file, cb) => {
		console.log(file);
		console.log(req.body.name);
		const filename = req.body.name;
		const fullnamefile = filename;
		console.log('file uploaded and saved as ' + fullnamefile);
		cb(null, fullnamefile);
	},
});

const upload = multer({ storage: storage });
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

router.route('/').post(upload.single('file'), async (req, resp) => {
	console.log('file path:' + req.file.path);

	const CLIENT_ID = process.env.CLIENT_ID_OFFICE_DRIVE;
	const CLIENT_SECRET = process.env.CLIENT_SECRET_OFFICE_DRIVE;
	const REDIRECT_URI = process.env.REDIRECT_URI_OFFICE_DRIVE;
	const REFRESH_TOKEN = process.env.REFRESH_TOKEN_OFFICE_DRIVE;

	const oauth2Client = new google.auth.OAuth2(
		CLIENT_ID,
		CLIENT_SECRET,
		REDIRECT_URI
	);

	oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

	const drive = google.drive({
		version: 'v3',
		auth: oauth2Client,
	});

	/* 
filepath which needs to be uploaded
Note: Assumes example.jpg file is in root directory, 
though this can be any filePath
*/
	const fileName = req.body.name;
	const filePath = path.join(__dirname, fileName);
	console.log('file path is : ', __dirname);
	console.log('file path is : ', req.file.path);

	async function uploadFile() {
		console.log('in uploadFile() function');
		console.log(__dirname + '//..//' + req.file.path);
		const newFileName = fileName;
		var folderId = '1r99NdP5yHH_yjHleMUM73z9bY1R2oMuY'; //CV folder
		try {
			const response = await drive.files.create({
				requestBody: {
					name: newFileName, //This can be name of your choice
					parents: [folderId],
					mimeType: mime.lookup(newFileName),
				},
				media: {
					mimeType: mime.lookup(newFileName),
					body: fs.createReadStream(__dirname + '//..//' + req.file.path),
				},
			});

			//mime
			console.log(response.data);
			console.log(__dirname);
			console.log(req.file.path);

			let fileText = '';

			try {
				const data = await reader.getText(__dirname + '//..//' + req.file.path); //parse text from file
				console.log(data);
				fileText = data;
			} catch (err) {
				console.log(err);
				fileText = err;
			}
			fs.unlinkSync(__dirname + '//..//' + req.file.path);
			console.log('file deleted from server', req.file.path);
			return resp.json({
				status: 'File uploaded',
				id: response.data.id,
				content: fileText,
			});
		} catch (error) {
			console.log(error.message, 'ffff');
			return resp.json({ status: error.message });
		}
	}

	uploadFile();
});

router.route('/drive').post(async (req, resp) => {
	return resp.send('File uploaded to drive');
});

module.exports = router;
