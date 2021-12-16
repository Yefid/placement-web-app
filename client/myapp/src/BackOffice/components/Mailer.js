import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Box, Grid } from '@material-ui/core';
import TagsComp from '../../LandingPageForm/components/Tags';
import mailHandlerUtils from '../../utils/candidatesUtils/mailHandlerUtils';
import SimpleSnackbar from './SimpleSnackbar';
import Editor from './CkEditor';
import jobsUtils from '../../utils/jobsUtils/utils';
import jobContactsUtils from '../../utils/jobContactsUtils/utils';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(0),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	container: {
		width: '100%',
	},

	emailView: {
		backgroundColor: 'white',
		boxShadow: '2px 2px 8px 4px rgba(0, 0, 0, 0.1)',
		padding: '16px',
		marginTop: theme.spacing(2),
		borderRadius: '8px',
	},
	gallery: {
		flexGrow: 1,
	},
}));

export default function CandidateMailer(props) {
	let history = useHistory();

	const classes = useStyles();
	const [emails, setEmails] = useState([]);
	const [content, setContent] = useState('');
	const [subject, setSubject] = useState('');
	const [html, setHtml] = useState('');
	const [isSent, setIsSent] = useState(false);
	const [isSentError, setIsSentError] = useState(false);
	const [openSnakber, setOpenSnakber] = React.useState(false);
	const [editorData, setEditorData] = useState('');
	const [jobContacts, setJobContacts] = useState([]);
	const [jobs, setJobs] = useState([]);
	const [jobsWithContactList, setJobsWithContactList] = useState([]);
	const [jobTitles, setJobTitles] = useState([]);

	const [jobsList, setJobsList] = useState([]);
	const [jobsIdList, setJobsIdList] = useState([]);
	const [jobsTextList, setJobsTextList] = useState([]);

	const [jobsListSelection, setJobsListSelection] = useState([]);
	const [isJobOfferInputVisible, setIsJobOfferInputVisible] = useState(false);

	const handleClick = () => {};

	useEffect(async () => {}, []);

	useEffect(async () => {
		formReset();
		getValuesFromSessionStorage();
	}, [props.isMailerVisible]);
	const handleCloseSnakber = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenSnakber(false);
	};

	const getJobs = async () => {
		const resp = await jobsUtils.getAllJobs();
		setJobs(resp.data);

		return resp.data;
	};

	const getJobsContacts = async () => {
		const resp = await jobContactsUtils.getAllJobContacts();
		setJobContacts(resp.data);
		return resp.data;
	};

	const JobsListWithContacts = async () => {
		let jobContacts = await getJobsContacts();

		let jobs = await getJobs();

		console.log(jobs);
		console.log(jobContacts);
		let jobsWithContactList = [];
		let jobTitles = [];
		jobs.forEach((x) => {
			let contactId = x.jobContactId;
			jobContacts.forEach((item) => {
				if (item._id == contactId) {
					jobsWithContactList.push(
						`${x.jobNumber} - ${x.companyToPublish} - ${x.company} - ${item.poc} - ${item.pocEmail}`
					);
					jobTitles.push(`${x.companyToPublish} (${x.jobNumber})`);
				}
			});
		});
		console.log(jobTitles);
		setJobTitles(jobTitles);
		console.log(jobsWithContactList);
		setJobsWithContactList(jobsWithContactList);
	};

	const JobsList = async () => {
		let jobs = await getJobs();

		console.log(jobs);

		const jobList = jobs.map((x) => {
			return {
				id: x._id,
				text: `${x.jobNumber} - ${x.companyToPublish} - ${x.company} `,
			};
		});
		setJobsList(jobList);

		const jobsIdList = jobList.map((x) => x.id);
		const jobsTextList = jobList.map((x) => x.text);
		setJobsIdList(jobsIdList);
		setJobsTextList(jobsTextList);

		console.log(jobList);
	};

	const getValuesFromSessionStorage = async () => {
		if (sessionStorage['action'] == 'apply candidate') {
			await JobsListWithContacts();
			setIsJobOfferInputVisible(false);

			setEmails([]);
			setSubject(`${sessionStorage['candidateName']}`);

			const tempEditorText = `
			<p>היי </p>
			<p>מה נשמע? </p>
			<p>להלן פירוט על ${sessionStorage['candidateName']}:</p>
			<p>${sessionStorage['candidateInsight']}</p>
			<p>להלן לינק לקו"ח:</p>
			<p>https://drive.google.com/file/d/${sessionStorage['candidatedriveId']}/view</p>

			<p></p>
			<p>בברכה,</p>
			<p></p>
			`;
			setEditorData(tempEditorText);
			setContent(tempEditorText);
			setContentAndHtml(tempEditorText);
		}
		if (sessionStorage['action'] == 'offer candidate another job') {
			await JobsList();
			setIsJobOfferInputVisible(true);
			setEmails([sessionStorage['candidateEmail']]);
			setJobsWithContactList([]);
			setJobsListSelection([]);

			setSubject(`משרה חדשה`);
		}
	};

	const formReset = () => {
		setEmails([]);
		setSubject('');
		setEditorData('');
		setContent('');
		setContentAndHtml('');
	};

	const mailSent = () => {
		setIsSentError(false);
		setIsSent(true);
		setOpenSnakber(true);

		handleCloseSnakber();
		setEmails([]);
		setContent('');
		setSubject('');
		setHtml('');
		setEditorData('');
		props.setIsMailerVisible(false);
	};

	const sendMail = async () => {
		let senderEmail = sessionStorage['email'];
		const emailsList = stringArrayToEmailArray(emails);
		let obj = {
			from: senderEmail,
			to: emailsList,
			subject: subject,
			text: content,
			html: html,
		};
		try {
			const resp = await mailHandlerUtils.sendMail(obj);
			console.log(resp.data);

			if (resp.data.length > 0) {
				console.log(resp.data);
				resp.data.forEach((element) => {
					console.log(element);
					if (element.response.includes('OK')) {
						console.log('email sent');
						mailSent();
					} else {
						setIsSentError(true);
						setIsSent(false);
						setOpenSnakber(true);
					}
				});
			} else {
				setIsSentError(true);
				setIsSent(false);
				setOpenSnakber(true);
			}
		} catch (err) {
			console.log(err);
			setIsSentError(true);
			setIsSent(false);
			setOpenSnakber(true);
		}
	};
	const getValues = (label, values) => {
		console.log(label, values);

		console.log('in getValues');
		if (label == 'emails') {
			setEmails(values);

			if (sessionStorage['action'] == 'apply candidate') {
				const indexOfJobListWithContacts = jobsWithContactList.indexOf(
					values[0]
				);

				setSubject(
					`${sessionStorage['candidateName']} - למשרת ${jobTitles[indexOfJobListWithContacts]}`
				);
			}
			console.log();
		}
		if (label == 'jobOffer') {
			setJobsListSelection(values);
			//get index of the selected text and find the id of it
			console.log(values[0]);
			let indexOfText = jobsTextList.indexOf(values[0]);
			console.log(jobsIdList[indexOfText]);

			setEditorData(
				jobsIdList[indexOfText]
					? `
					<p>היי,</p>
					<p>מה נשמע?</p>
					<p>יש לנו משרה מעניינת - להלן התיאור שלה:</p>
					<p>https://placementcompany.co.il/landing/${jobsIdList[indexOfText]} </p>
					<p>שנמשיך בתהליך?</p>
					<p>בברכה,</p>
					`
					: ''
			);
		}
	};

	const stringArrayToEmailArray = (mails) => {
		let emailList = [];
		console.log(mails);

		mails.forEach((x) => {
			try {
				let reResp = [];
				//regex to find email
				let re =
					/(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
				reResp = x?.match(re);
				console.log(reResp);
				console.log(reResp[0]);
				emailList.push(x.match(re)[0]);
			} catch {
				alert(`${x} אינו מכיל כתובת מייל`);
			}
		});

		return emailList;
	};
	const setContentAndHtml = (data) => {
		const name = 'placementcompany';
		const job = '';
		const phone = '1234';
		const email = 'office@placementcompany.co.il';

		let sign = '';
		if (sessionStorage['email'] == 'office@placementcompany.co.il') {
			sign =
				'<img src="http://www.placementcompany.co.il/static/media/officesign.11812eb9.png" >';
		} else if (sessionStorage['email'] == 'office@placementcompany.co.il') {
			sign =
				'<img src="http://www.placementcompany.co.il/static/media/sign.a3358168.png" >';
		}

		const htmlBody = `
	<div dir="rtl" lang="he">${data}  ${sign}</div>
		`;

		setHtml(htmlBody);
	};

	return (
		<div>
			<Grid container spacing={2}>
				<Grid item xs={12} md={12}>
					<div className={classes.paper}>
						<form className={classes.form} noValidate>
							<Box align="right">מייל שולח: {sessionStorage['email']}</Box>
							<Box align="right">
								<TagsComp
									required
									id="emails"
									label="מייל נמען"
									data={jobsWithContactList}
									name="emails"
									getValues={getValues}
									storedValues={emails ? emails : []}
								/>
							</Box>

							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="subject"
								label="נושא"
								type="subject"
								id="subject"
								onChange={(e) => setSubject(e.target.value)}
								multiline
								value={subject}
							/>
							{isJobOfferInputVisible && (
								<Box align="right">
									<TagsComp
										required
										id="jobOffer"
										label="משרה להצעה"
										data={Object.values(jobsTextList)}
										name="jobOffer"
										getValues={getValues}
										storedValues={jobsListSelection ? jobsListSelection : []}
									/>
								</Box>
							)}
							<Editor
								editorData={editorData}
								setEditorData={setEditorData}
								setContentAndHtml={setContentAndHtml}
							/>

							<Button
								type="button"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								onClick={sendMail}
							>
								שלח מייל
							</Button>
						</form>
					</div>
				</Grid>
			</Grid>
			<SimpleSnackbar
				messege={
					(isSent && 'מייל נשלח בהצלחה') ||
					(isSentError &&
						' נראה כי ארעה שגיאה בשליחת המייל, אנא בדוק את תיבת הדואר היוצא שלך ')
				}
				open={openSnakber}
				handleClose={handleCloseSnakber}
			/>
		</div>
	);
}
