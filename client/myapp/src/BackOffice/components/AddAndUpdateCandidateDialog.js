import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
	Box,
	Grid,
	makeStyles,
	withStyles,
	TextField,
	Typography,
} from '@material-ui/core';
import ReceiptIcon from '@material-ui/icons/Receipt';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TagsComp from '../../LandingPageForm/components/Tags';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	textField: {
		marginRight: theme.spacing(1),
		width: '100%',
	},
}));
export default function AddAndUpdateCandidateDialog({
	open,
	handleClose,
	data,
	onChange,
	handleFormSubmit,
	sendCV,
	industryData,
	getValues,
	isUploading,
}) {
	const {
		_id,
		name,
		email,

		phone,

		birthDate,
		wantedJobs,
		certificates,
		experienceYears,
		requiredJobScale,
		requiredJobAreas,
		pastRoles,
		pastFieldOfActivity,
		salaryExpectations,
		freeText,
		cv,
		fromWhere,
		insight,
		driveId,
		cvContent,
		status,
	} = data;
	const classes = useStyles();
	const [antTabValue, setAntTabValue] = useState(0);

	const AntTabs = withStyles({
		root: {
			borderBottom: '1px solid #e8e8e8',
		},
		indicator: {
			backgroundColor: '#1890ff',
		},
	})(Tabs);

	const AntTab = withStyles((theme) => ({
		root: {
			textTransform: 'none',
			minWidth: 72,
			fontWeight: theme.typography.fontWeightRegular,
			marginRight: theme.spacing(4),
			fontFamily: [
				'-apple-system',
				'BlinkMacSystemFont',
				'"Segoe UI"',
				'Roboto',
				'"Helvetica Neue"',
				'Arial',
				'sans-serif',
				'"Apple Color Emoji"',
				'"Segoe UI Emoji"',
				'"Segoe UI Symbol"',
			].join(','),
			'&:hover': {
				color: '#40a9ff',
				opacity: 1,
			},
			'&$selected': {
				color: '#1890ff',
				fontWeight: theme.typography.fontWeightMedium,
			},
			'&:focus': {
				color: '#40a9ff',
			},
		},
		selected: {},
	}))((props) => <Tab disableRipple {...props} />);

	const handleAntTabChange = (event, newValue) => {
		setAntTabValue(newValue);
	};

	return (
		<div>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle id="alert-dialog-slide-title">
					{_id ? 'עדכן פרטי מועמד' : 'פרטי מועמד חדש'}
				</DialogTitle>
				<DialogContent>
					<form>
						<Box pt={'1rem'}>
							<Grid container spacing={1}>
								<Grid item xs={12} sm={6}>
									<Typography variant="h5"> פרטים אישיים:</Typography>
								</Grid>
								<Grid item xs={12} sm={6}>
									{cv && (
										<ReceiptIcon
											className="fa fa-plus-circle"
											color="secondary"
											style={{ fontSize: 30, position: 'relative', top: '4px' }}
											onClick={() =>
												window.open(
													'https://drive.google.com/file/d/' +
														driveId +
														'/view?usp=drivesdk',
													'_blank',
													'location=yes,height=570,width=520,scrollbars=yes,status=yes'
												)
											}
										/>
									)}
									<Button
										variant="outlined"
										component="label"
										color="secondary"
										startIcon={<CloudUploadIcon />}
									>
										{cv ? 'עדכן קורות חיים' : 'הוספת קורות חיים'}

										<input
											name="file"
											type="file"
											onChange={(e) => {
												sendCV(e);
											}}
											hidden
										/>
									</Button>{' '}
								</Grid>

								<Grid item xs={12} sm={6}>
									<TextField
										id="name"
										value={name ? name : ''}
										onChange={(e) => onChange(e)}
										//placeholder="Enter name"
										label="שם"
										variant="outlined"
										margin="dense"
										fullWidth
									/>
								</Grid>

								<Grid item xs={12} sm={6}>
									<TextField
										id="email"
										value={email ? email : ''}
										onChange={(e) => onChange(e)}
										//placeholder="Enter email"
										label="אימייל"
										variant="outlined"
										margin="dense"
										fullWidth
									/>
								</Grid>

								<Grid item xs={12} sm={6}>
									<TextField
										id="phone"
										value={phone ? phone : ''}
										onChange={(e) => onChange(e)}
										//placeholder="Enter email"
										label="טלפון"
										variant="outlined"
										margin="dense"
										fullWidth
									/>
								</Grid>

								<Grid item xs={12} sm={6}>
									<TextField
										value={birthDate ? birthDate : '1900-01-01'}
										variant="outlined"
										id="birthDate"
										label="תאריך לידה"
										type="date"
										margin="dense"
										onChange={(e) => {
											onChange(e);
										}}
										className={classes.textField}
										InputLabelProps={{
											shrink: true,
										}}
									/>
								</Grid>
							</Grid>
						</Box>

						<Box align="right">
							<TagsComp
								id="status"
								label="סטטוס"
								data={industryData?.status}
								name="status"
								getValues={getValues}
								storedValues={status ? status : ''}
							/>
						</Box>

						<AntTabs
							value={antTabValue}
							onChange={handleAntTabChange}
							aria-label="ant example"
						>
							<AntTab label="חוות דעתנו" />
							<AntTab label="פרטים נוספים" />
							<AntTab label="מלל קורות חיים" />
						</AntTabs>
						{antTabValue == 0 && (
							<div>
								<TextField
									id="insight"
									value={insight ? insight : ''}
									onChange={(e) => onChange(e)}
									//placeholder="Enter email"
									label="חוות דעתנו"
									variant="outlined"
									margin="dense"
									fullWidth
									multiline
									rows={10}
								/>
							</div>
						)}
						{antTabValue == 1 && (
							<div>
								<Typography variant="h5"> לימודים וניסיון :</Typography>
								<Box align="right">
									<TagsComp
										id="certificates"
										label="לימודים ותעודות"
										data={industryData?.certificates}
										name="certificates"
										getValues={getValues}
										storedValues={certificates ? certificates : ''}
									/>
								</Box>

								<TextField
									id="experienceYears"
									value={experienceYears ? experienceYears : ''}
									onChange={(e) => onChange(e)}
									//placeholder="Enter email"
									label="שנות ניסיון"
									variant="outlined"
									margin="dense"
									fullWidth
								/>
								<Box align="right">
									<TagsComp
										id="pastRoles"
										label="תפקידים קודמים"
										data={industryData?.pastRoles}
										name="pastRoles"
										getValues={getValues}
										storedValues={pastRoles ? pastRoles : ''}
									/>
								</Box>

								<Box align="right">
									<TagsComp
										id="pastFieldOfActivity"
										label="תחומי פעילות קודמים"
										data={industryData?.pastFieldOfActivity}
										name="pastFieldOfActivity"
										getValues={getValues}
										storedValues={
											pastFieldOfActivity ? pastFieldOfActivity : ''
										}
									/>
								</Box>

								<Typography variant="h5"> העדפות אישיות :</Typography>
								<Box align="right">
									<TagsComp
										id="wantedJobs"
										label="משרות מבוקשות"
										data={industryData?.wantedJobs}
										name="wantedJobs"
										getValues={getValues}
										storedValues={wantedJobs ? wantedJobs : ''}
									/>
								</Box>

								<Box align="right">
									<TagsComp
										id="requiredJobScale"
										label="היקף משרה"
										data={industryData?.requiredJobScale}
										name="requiredJobScale"
										getValues={getValues}
										storedValues={requiredJobScale ? requiredJobScale : ''}
									/>
								</Box>

								<Box align="right">
									<TagsComp
										id="requiredJobAreas"
										label="אזורים מועדפים"
										data={industryData?.requiredJobAreas}
										name="requiredJobAreas"
										getValues={getValues}
										storedValues={requiredJobAreas ? requiredJobAreas : ''}
									/>
								</Box>

								<TextField
									id="salaryExpectations"
									value={salaryExpectations ? salaryExpectations : ''}
									onChange={(e) => onChange(e)}
									label="ציפיות שכר"
									variant="outlined"
									margin="dense"
									fullWidth
								/>
								<TextField
									id="freeText"
									value={freeText ? freeText : ''}
									onChange={(e) => onChange(e)}
									label="מלל חופשי"
									variant="outlined"
									margin="dense"
									fullWidth
									multiline
								/>

								<TextField
									id="cv"
									value={cv ? cv : ''}
									onChange={(e) => onChange(e)}
									label='קו"ח'
									variant="outlined"
									margin="dense"
									fullWidth
									disabled
								/>

								<TextField
									id="fromWhere"
									value={fromWhere ? fromWhere : ''}
									onChange={(e) => onChange(e)}
									label="מהיכן הגיע?"
									variant="outlined"
									margin="dense"
									fullWidth
								/>
							</div>
						)}
						{antTabValue == 2 && (
							<div>
								<TextField
									id="cvContent"
									value={cvContent ? cvContent : ''}
									onChange={(e) => onChange(e)}
									label="מלל קורות חיים"
									variant="outlined"
									margin="dense"
									fullWidth
									multiline
								/>
							</div>
						)}
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						בטל
					</Button>

					{!isUploading && (
						<Button
							color="primary"
							onClick={() => {
								handleFormSubmit();
							}}
						>
							{_id ? 'עדכן' : 'שמור'}
						</Button>
					)}

					{isUploading && <CircularProgress color="primary" />}
				</DialogActions>
			</Dialog>
		</div>
	);
}
