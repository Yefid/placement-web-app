const nodemailer = require('nodemailer');
const { google } = require('googleapis');

async function sendMail(obj) {
	try {
		let CLIENT_ID = '';
		let CLIENT_SECRET = '';
		let REDIRECT_URI = '';
		let REFRESH_TOKEN = '';

		if (obj.from == 'office@placementcompany.co.il') {
			CLIENT_ID = process.env.CLIENT_ID_OFFICE;
			CLIENT_SECRET = process.env.CLIENT_SECRET_OFFICE;
			REDIRECT_URI = process.env.REDIRECT_URI_OFFICE;
			REFRESH_TOKEN = process.env.REFRESH_TOKEN_OFFICE;
		} else if (obj.from == 'david@placementcompany.co.il') {
			CLIENT_ID = process.env.CLIENT_ID_DAVID;
			CLIENT_SECRET = process.env.CLIENT_SECRET_DAVID;
			REDIRECT_URI = process.env.REDIRECT_URI_DAVID;
			REFRESH_TOKEN = process.env.REFRESH_TOKEN_DAVID;
		} else if (obj.from == 'dana@placementcompany.co.il') {
			CLIENT_ID = process.env.CLIENT_ID_DANA;
			CLIENT_SECRET = process.env.CLIENT_SECRET_DANA;
			REDIRECT_URI = process.env.REDIRECT_URI_DANA;
			REFRESH_TOKEN = process.env.REFRESH_TOKEN_DANA;
		}

		const oAuth2Client = new google.auth.OAuth2(
			CLIENT_ID,
			CLIENT_SECRET,
			REDIRECT_URI
		);
		oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

		const accessToken = await oAuth2Client.getAccessToken();

		const transport = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				type: 'OAuth2',
				user: obj.from,
				clientId: CLIENT_ID,
				clientSecret: CLIENT_SECRET,
				refreshToken: REFRESH_TOKEN,
				accessToken: accessToken,
			},
		});

		const mailOptions = {
			from: `'placementcompany <${obj.from}>'`,
			to: obj.to,
			subject: obj.subject,
			text: obj.text,
			html: obj.html,
		};
		console.log(mailOptions);
		const result = await transport.sendMail(mailOptions);
		return result;
	} catch (error) {
		console.log(error);
		return error;
	}
}

function listMessages(oauth2Client, userId, query, callback) {
	const gmail = google.gmail('v1');
	gmail.users.messages.list(
		{
			auth: oauth2Client,
			userId: 'me',
		},
		(err, response) => {
			console.log(response.data.messages[0].id);
		}
	);
}

const getMessages = (oauth2Client) => {
	const gmail = google.gmail('v1');
	request = gmail.users.messages.get(
		{
			auth: oauth2Client,
			userId: 'me',
			id: '17c09aa524d5d54c',
		},
		(err, res) => {
			data = res.data.snippet;
		}
	);
};


const consoler = (emailData) => {
};

module.exports = { consoler, sendMail };
