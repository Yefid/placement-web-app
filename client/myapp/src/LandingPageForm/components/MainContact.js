import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import ContactInfo from './ContactInfo';
import ExpinfoForm from './ExpInfo';
import Review from './Review';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
	Avatar,
	Box,
	Checkbox,
	FormControlLabel,
	Grid,
	Icon,
} from '@material-ui/core';
import logo from '../../img/logo2.png';
import { useSelector } from 'react-redux';
import utils from '../../utils/candidatesUtils/utils';
import landingUtils from '../../utils/landingUtils/utils';
import PrivacyDialogComp from './PrivacyDialog';

const useStyles = makeStyles((theme) => ({
	direction: 'rtl',

	appBar: {
		position: 'relative',
	},

	layout: {
		width: 'auto',
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		padding: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			padding: theme.spacing(3),
		},
	},
	stepper: {
		padding: theme.spacing(3, 0, 5),
		backgroundColor: 'transparent',
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
	},
	biggerImage: {
		height: '80px',
		width: '80px',
		margin: 'auto',
	},
}));

const steps = ['פרטי התקשרות', 'קצת על עצמי', 'סיכום ושליחה'];

const isAcceptTermsCB = (isAccectTerms = false) => {
	return isAccectTerms;
};

const getIsEmpty = (isEmpty) => {};

function MainContactComp() {
	const storeData = useSelector((state) => state);

	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);
	const [privacyDialogOpen, setPrivacyDialogOpen] = useState(false);
	const [acceptTerms, setAcceptTerms] = useState(false);
	const [markRequiredFields, setMarkRequiredFields] = useState(false);
	const [isUploading, setIsUploading] = useState(false);

	useEffect(() => {}, [storeData]);

	function getStepContent(step) {
		switch (step) {
			case 0:
				return (
					<ContactInfo
						markRequiredFields={markRequiredFields}
						setMarkRequiredFields={setMarkRequiredFields}
					/>
				);
			case 1:
				return <ExpinfoForm />;
			case 2:
				return (
					<Review acceptTerms={acceptTerms} setIsUploading={setIsUploading} />
				);
			default:
				throw new Error('Unknown step');
		}
	}

	const handleNext = async () => {
		if (activeStep === 0) {
			let { fname, lname, phone, email } = storeData.candidateData;
			if (!fname || !lname || !phone || !email) {
				setMarkRequiredFields(true);
				return;
			}
		}
		if (activeStep === steps.length - 1) {
			let {
				fname,
				lname,
				phone,
				email,
				offers,
				certificates,
				experienceYears,
				pastRoles,
				pastFieldOfActivity,
				wantedJobs,
				salaryExpectations,
				requiredJobAreas,
				requiredJobScale,
				freeText,
				cv,
				fromWhere,
				driveId,
				cvContent,
			} = storeData.candidateData;

			const data = {
				name: fname + ' ' + lname,
				idNumber: '',
				email: email,
				phone: phone,
				offers: true,
				gender: '',
				birthDate: '1900-01-01',
				wantedJobs: wantedJobs,
				certificates: certificates,
				experienceYears: experienceYears,
				requiredJobScale: requiredJobScale,
				requiredJobAreas: requiredJobAreas,
				pastRoles: pastRoles,
				pastFieldOfActivity: pastFieldOfActivity,
				salaryExpectations: salaryExpectations,
				freeText: freeText,
				cv: cv,
				fromWhere: [storeData.jobData.jobNumber],
				driveId: driveId,
				cvContent: cvContent,
			};

			if (!acceptTerms) {
				alert('כדי לשלוח את הטופס יש לאשר את תנאי השימוש ומדיניות הפרטיות');
				return;
			}
			const resp = await landingUtils.addCandidate(data);
		}

		setActiveStep(activeStep + 1);
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};
	const openPrivacyDialog = () => {
		setPrivacyDialogOpen(true);
	};

	const closePrivacyDialog = () => {
		setPrivacyDialogOpen(false);
	};
	return (
		<div>
			<main className={classes.layout}>
				<Box component="span" m={1}>
					<Box justifyContent="center" mb={3}>
						<Avatar
							className={classes.biggerImage}
							alt="placementcompany"
							src={logo}
						/>
					</Box>

					<Typography component="h1" variant="h4" align="center">
						placement company name
					</Typography>
					<Typography component="h6" variant="h6" align="center">
						סלוגן
					</Typography>
				</Box>

				<Stepper activeStep={activeStep} className={classes.stepper}>
					{steps.map((label) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>
				<React.Fragment>
					{activeStep === steps.length ? (
						<React.Fragment>
							<Typography variant="h5" gutterBottom>
								פרטיכם נשלחו, שיהיה בהצלחה!
							</Typography>

							<Typography variant="subtitle1">
								המערכת שלנו תבדוק התאמה למשרות הקיימות במערכת ולמשרות עתידיות
								שיכולות להתאים לכם.
								<br />
								placement company name
							</Typography>
						</React.Fragment>
					) : (
						<React.Fragment>
							{getStepContent(activeStep)}
							{activeStep === steps.length - 1 && (
								<FormControlLabel
									control={
										<Checkbox
											color="secondary"
											name="saveAddress"
											//value="yes"
											checked={acceptTerms}
											onChange={(e) => {
												setAcceptTerms(!acceptTerms);
											}}
										/>
									}
									label={
										<div>
											<span>אני מקבל/ת את </span>
											<Link to={'/'} onClick={() => openPrivacyDialog()}>
												תנאי השימוש ומדיניות הפרטיות
											</Link>
											<span>
												{' '}
												ומעוניין/ת לקבל מידע על משרות נוספות שיכולות להתאים לי
											</span>
										</div>
									}
								/>
							)}
							<div className={classes.buttons}>
								{activeStep !== 0 && (
									<Button onClick={handleBack} className={classes.button}>
										Back
									</Button>
								)}
								{!isUploading && (
									<Button
										variant="contained"
										color="primary"
										onClick={handleNext}
										className={classes.button}
									>
										{activeStep === steps.length - 1 ? 'שלח' : 'הבא'}
									</Button>
								)}

								{isUploading && (
									<Button>
										<CircularProgress color="primary" />
									</Button>
								)}
							</div>
						</React.Fragment>
					)}
					<PrivacyDialogComp
						open={privacyDialogOpen}
						handleClose={closePrivacyDialog}
					/>
				</React.Fragment>
			</main>
		</div>
	);
}

export default MainContactComp;
