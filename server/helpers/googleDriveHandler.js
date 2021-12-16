var mime = require('mime-types');

const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

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

const fileName = 'docx1.docx';
const filePath = path.join(__dirname, fileName);

async function uploadFile() {
	const newFileName = fileName;
	try {
		const response = await drive.files.create({
			requestBody: {
				name: newFileName, //This can be name of your choice
				mimeType: mime.lookup(newFileName),
			},
			media: {
				mimeType: mime.lookup(newFileName),
				body: fs.createReadStream(filePath),
			},
		});
		console.log(response.data);
	} catch (error) {
		console.log(error.message);
	}
}

async function deleteFile() {
	try {
		const response = await drive.files.delete({
			fileId: '1naY6k8oG3_ctJhgwkhFhHn2o_dsxZkhf',
		});
		console.log(response.data, response.status);
	} catch (error) {
		console.log(error.message);
	}
}

async function generatePublicUrl() {
	try {
		const fileId = '17yfJ0ZSHW6t-2A-QcZ4oftez0vNORYBE';
		await drive.permissions.create({
			fileId: fileId,
			requestBody: {
				role: 'reader',
				type: 'anyone',
			},
		});

			const result = await drive.files.get({
			fileId: fileId,
			fields: 'webViewLink, webContentLink',
		});
		console.log(result.data);
	} catch (error) {
		console.log(error.message);
	}
}

console.log(mime.lookup('dsg.docx'));
console.log(mime.lookup('dsg.pdf'));

module.exports = { uploadFile };
