const express = require('express');
const multer = require('multer');
const path = require('path');
var reader = require('any-text');
const googleDriveHandler = require('../../helpers/googleDriveHandler');
var mime = require('mime-types');

const { google } = require('googleapis');
const fs = require('fs');

exports.uploadCVFromMail = async (fileName, newFileName) => {
	console.log('fileName: ' + fileName);
	console.log('newFileName: ' + newFileName);

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

	const filePath = path.join(__dirname + '//..//..//CVsFromMail//', fileName);
	console.log(filePath);

	async function uploadFile() {
		var folderId = '13vTv_nW9QrFPC1LmI_XvFzw8OdrtN8C_'; //CV2 folder

		try {
			const response = await drive.files.create({
				requestBody: {
					name: newFileName, //This can be name of your choice
					parents: [folderId],
					mimeType: mime.lookup(newFileName),
				},
				media: {
					mimeType: mime.lookup(newFileName),
					body: fs.createReadStream(filePath),
				},
			});
			console.log(response.data.id);
			let fileText = '';

			try {
				const data = await reader.getText(filePath); //parse text from file
				fileText = data;
				fs.unlinkSync(filePath);

				return { fileText: fileText, cvId: response.data.id };
			} catch (err) {
				fs.unlinkSync(filePath);
				console.log(err);
				fileText = 'there was a problem parsing the text';
			}

			console.log('file deleted from server', filePath);
		} catch (error) {
			console.log(error.message);
			return { status: error.message };
		}
	}

	let text = await uploadFile();
	return text;
};
