const mailHandler = require('../../helpers/mailHandler');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
var base64 = require('base-64');
var utf8 = require('utf8');

const getAuth = () => {
	const CLIENT_ID = process.env.CLIENT_ID_OFFICE;
	const CLIENT_SECRET = process.env.CLIENT_SECRET_OFFICE;
	const REDIRECT_URI = process.env.REDIRECT_URI_OFFICE;
	const REFRESH_TOKEN = process.env.REFRESH_TOKEN_OFFICE;

	const oAuth2Client = new google.auth.OAuth2(
		CLIENT_ID,
		CLIENT_SECRET,
		REDIRECT_URI
	);

	oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
	return oAuth2Client;
};

const sendMail = async (emailData) => {
	try {
		let resp = {};
		let emailList = emailData.to;
		let resps = [];
		for (const email of emailList) {
			let contentToSend = {
				from: emailData.from,
				to: email,
				subject: emailData.subject,
				text: emailData.text,
				html: emailData.html,
			};
			try {
				resp = await mailHandler.sendMail(contentToSend);
				resps.push(resp);
			} catch (err) {
				return err;
			}
			console.log(resp);
		}
		return resps;
	} catch (err) {
		console.log(err);
		return err;
	}
};

async function listMessages(userId, query, callback) {
	const auth = getAuth();

	const gmail = google.gmail('v1');
	return new Promise((resolve, reject) => {
		gmail.users.messages.list(
			{
				auth: auth,
				userId: 'me',
				q: 'is:unread has:attachment', //support the same queries the gmail mail box does
			},
			async (err, response) => {
				let messagesData = [];
				try {
					const messagesList = response.data.messages;
					for (let index = 0; index < messagesList.length; index++) {
						const messageId = messagesData[index]?.id;
						const resp = await getMessages(messagesList[index]?.id); // working
						messagesData.push(resp);
					}

					resolve(messagesData);
				} catch (err) {
					reject(err);
				}
			}
		);
	});
}

const getMessages = (id) => {
	const auth = getAuth();

	const gmail = google.gmail('v1');
	return new Promise((resolve, reject) => {
		gmail.users.messages.get(
			{
				auth: auth,
				userId: 'me',
				id: id,
			},
			(err, res) => {
				try {
					const subject = res.data.payload.headers.find(
						(x) => x.name == 'Subject'
					).value;

					const from = res.data.payload.headers.find(
						(x) => x.name == 'From'
					).value;

					const date = res.data.payload.headers.find(
						(x) => x.name == 'Date'
					).value;

					const filename = res.data.payload.parts[1].filename;
					console.log(res.data.payload.parts[1].headers);
					const attachmentEncoding = res.data.payload.parts[1].headers.find(
						(x) =>
							x.name == 'Content-Transfer-Encoding' ||
							x.name == 'Content-transfer-encoding'
					).value;

					const attachmentID = res.data.payload.parts[1].body.attachmentId;

					//get email content
					let mailBody = '';
					try {
						mailBody = decoding(res.data.payload.parts[0].parts[0].body.data);
					} catch {
						mailBody = 'Complicated Content';
					}

					const { candidateName, job } =
						parseCandidateNameAndJobFromSubject(subject);

					resolve({
						date,
						from,
						subject: candidateName,
						filename,
						messageId: id,
						attachmentID,
						attachmentEncoding,
						mailBody,
						jobFromMail: job,
					});
				} catch (err) {
					reject(err);
				}
			}
		);
	});
};

const downloadAttachments = async (
	messageId,
	attachmentId,
	encodingType,
	fileName
) => {
	return new Promise((resolve, reject) => {
		console.log('Downloading attachment...');
		const auth = getAuth();

		const gmail = google.gmail('v1');
		request = gmail.users.messages.attachments.get(
			{
				auth: auth,
				userId: 'me',
				messageId: messageId,
				id: attachmentId,
			},
			(err, res) => {
				const fileExtantion = path.extname(fileName);
				var filename = __dirname + '//..//..//CVsFromMail//' + fileName;

				fs.writeFile(filename, res.data.data, encodingType, function (err) {
					if (err) {
						reject(err);
					} else {
						//mark as read
						request = gmail.users.messages.modify(
							{
								auth: auth,
								userId: 'me',
								id: messageId,
								resource: {
									addLabelIds: [],
									removeLabelIds: ['UNREAD'],
								},
							},
							(err, res) => {
								if (!err)
									console.log('messageId: ' + messageId + ' marked as read ');
								else console.log(err);
							}
						);
						resolve({
							response:
								'file named ' + fileName + ' has been downloaded successfully!',
							fileName: fileName,
						});
					}
				});
			}
		);
	});
};

const decoding = (encoded) => {
	let bytes = base64.decode(encoded);
	let text = utf8.decode(bytes);
	return text;
};

const parseCandidateNameAndJobFromSubject = (subject) => {
	let candidateName = '';
	let job = '';

	if (subject.includes('מועמדות חדשה מ')) {
		let startWord = 'מועמדות חדשה מ';
		let endWord = 'למשרת';

		let start = subject.indexOf(startWord) + startWord.length;
		let end = subject.indexOf(endWord);

		candidateName = subject.slice(start, end);

		let startWord2 = 'למשרת';
		let start2 = subject.indexOf(startWord2) + startWord2.length;
		job = subject.slice(start2);
	} else {
		candidateName = subject;
		job = '';
	}

	return { candidateName, job };
};

module.exports = { sendMail, getMessages, listMessages, downloadAttachments };
