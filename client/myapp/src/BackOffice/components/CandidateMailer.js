import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { Box, Grid } from '@material-ui/core';
import TagsComp from '../../LandingPageForm/components/Tags';
import mailHandlerUtils from '../../utils/candidatesUtils/mailHandlerUtils';
import SimpleSnackbar from './SimpleSnackbar';
import signature from './Signature';
import Editor from './CkEditor';
import { MyEditor } from './DraftJs';
import SimpleCard from './Card';

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

	const handleCloseSnakber = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenSnakber(false);
	};
	const mailSent = () => {
		setIsSentError(false);
		setOpenSnakber(true);

		setIsSent(true);
		setEmails([]);
		setContent('');
		setSubject('');
		setHtml('');
	};

	const sendMail = async () => {
		let senderEmail = sessionStorage['email'];

		let obj = {
			from: senderEmail,
			to: emails,
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
		setEmails(values);
	};

	const setContentAndHtml = (data) => {
		const name = 'placement company name';
		const job = '';
		const phone = '1234';
		const email = 'office@placementcompany.co.il';
		const sign = signature(name, job, phone, email);

		const htmlBody = `<html><body>${data}  ${sign}</body></html>	
		`;

		setHtml(htmlBody);
	};
	return (
		<div>
			<Grid container spacing={2}>
				<Grid item xs={12} md={12}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						שליחת מייל{' '}
					</Typography>
				</Grid>
				<Grid></Grid>
				<Grid container className={classes.gallery}>
					<Box m={1}>
						<SimpleCard />
					</Box>
					<Box m={1}>
						<SimpleCard />
					</Box>
					<Box m={1}>
						<SimpleCard />
					</Box>
				</Grid>
				<Grid item xs={12} md={8}>
					<div className={classes.paper}>
						<form className={classes.form} noValidate>
							<Box align="right">
								<TagsComp
									required
									id="emails"
									label="אימייל"
									data={[]}
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
				<Grid item xs={12} md={4}>
					<Box
						className={classes.emailView}
						sx={{
							boxShadow: 1,
						}}
					>
						<div dangerouslySetInnerHTML={{ __html: html }} />
					</Box>
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
