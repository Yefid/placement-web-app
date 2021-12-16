import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import {
	Box,
	InputLabel,
	MenuItem,
	TextField,
	Typography,
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	formControl: {},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddAndUpdateCandidateDialog({
	id,
	open,
	handleClose,
	data,
	onChange,
	handleFormSubmit,
	industries,
	jobContacts,
	poc,
	pocEmail,
	pocPhone,
}) {
	const {
		_id,
		jobNumber,
		companyToPublish,
		companyDescription,
		jobDescriprion,
		jobRequirements,
		landingPageLink,
		subscriptions,
		industryName,
		notes,
		jobContactId,
	} = data;

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
				<Box pt={'1rem'} style={{ display: 'flex' }}>
					<DialogTitle id="alert-dialog-slide-title">
						{_id ? 'עדכן פרטי משרה' : 'פרטי משרה חדשה'}
					</DialogTitle>

					<Box
						style={{
							marginLeft: 0,
							marginRight: 'auto',
							paddingLeft: '32px',
							paddingTop: '16px',
						}}
					></Box>
				</Box>

				<DialogContent>
					<form>
						<Box pt={'1rem'}>
							<Typography variant="h5"> כללי:</Typography>
							<TextField
								id="jobNumber"
								value={jobNumber}
								onChange={(e) => onChange(e)}
								label="מספר משרה"
								variant="outlined"
								margin="dense"
								fullWidth
								disabled
							/>
							<TextField
								id="jobId"
								value={_id}
								onChange={(e) => onChange(e)}
								label="id"
								variant="outlined"
								margin="dense"
								fullWidth
								disabled
							/>

							<FormControl
								margin="dense"
								fullWidth
								variant="outlined"
								required
								error={false}
							>
								<InputLabel id="demo-simple-select-outlined-label">
									שם תעשיה
								</InputLabel>
								<Select
									id="industryName"
									labelId="industryName-label"
									value={industryName}
									onChange={(event, newValue) => {
										console.log(industries);
										onChange(event, newValue.props.children, 'industryName'); //send value and id additionaly
									}}
									label="שם תעשיה"
								>
									{industries.map((x, index) => {
										return (
											<MenuItem key={index} value={x.id}>
												{x.industry}
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>
						</Box>
						<Box pt={'1rem'}>
							<Typography variant="h5"> לפרסום:</Typography>
							<TextField
								id="companyToPublish"
								value={companyToPublish}
								onChange={(e) => onChange(e)}
								label="שם חברה לפרסום"
								variant="outlined"
								margin="dense"
								fullWidth
							/>
							<TextField
								id="companyDescription"
								value={companyDescription}
								onChange={(e) => onChange(e)}
								label="תיאור חברה"
								variant="outlined"
								margin="dense"
								fullWidth
								multiline={true}
							/>
							<TextField
								id="jobDescriprion"
								value={jobDescriprion}
								onChange={(e) => onChange(e)}
								label="תיאור משרה"
								variant="outlined"
								margin="dense"
								fullWidth
								multiline={true}
							/>

							<TextField
								id="jobRequirements"
								value={jobRequirements}
								onChange={(e) => onChange(e)}
								label="דרישות משרה"
								variant="outlined"
								margin="dense"
								fullWidth
								multiline={true}
							/>
						</Box>

						<Box pt={'1rem'}>
							<Typography variant="h5">פרטי חברה:</Typography>
							{false && (
								<TextField
									id="jobContactId"
									value={jobContactId}
									label="מזהה איש קשר"
									variant="outlined"
									margin="dense"
									fullWidth
								/>
							)}
							<FormControl
								margin="dense"
								fullWidth
								variant="outlined"
								required
								error={false}
							>
								<InputLabel id="demo-simple-select-outlined-label">
									שם החברה
								</InputLabel>
								<Select
									id="company"
									labelId="company-label"
									value={jobContactId ? jobContactId : ''}
									onChange={async (event, newValue) => {
										onChange(
											event,
											newValue.props.value,
											'jobContactId',
											newValue.props.children
										);
									}}
									label="שם חברה"
								>
									{jobContacts?.map((x, index) => {
										return (
											<MenuItem key={index} value={x._id}>
												{x.companyName ? x.companyName : ''}
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>

							<TextField
								id="poc"
								value={poc}
								onChange={(e) => onChange(e)}
								label="איש קשר"
								variant="outlined"
								margin="dense"
								fullWidth
								disabled
							/>
							<TextField
								id="pocEmail"
								value={pocEmail}
								onChange={(e) => onChange(e)}
								label="אימייל איש קשר"
								variant="outlined"
								margin="dense"
								fullWidth
								disabled
							/>

							<TextField
								id="pocPhone"
								value={pocPhone}
								onChange={(e) => onChange(e)}
								label="טלפון איש קשר"
								variant="outlined"
								margin="dense"
								fullWidth
								disabled
							/>
						</Box>

						<Box pt={'1rem'}>
							<Typography variant="h5"> מידע נוסף:</Typography>
							<TextField
								id="notes"
								value={notes}
								onChange={(e) => onChange(e)}
								label="הערות"
								variant="outlined"
								margin="dense"
								fullWidth
								multiline={true}
							/>
							<TextField
								id="landingPageLink"
								value={landingPageLink}
								onChange={(e) => onChange(e)}
								label="דף נחיתה"
								variant="outlined"
								margin="dense"
								fullWidth
								disabled
							/>
							<TextField
								id="subscriptions"
								value={subscriptions}
								onChange={(e) => onChange(e)}
								label="מועמדים שנרשמו למשרה"
								variant="outlined"
								margin="dense"
								fullWidth
							/>
						</Box>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						בטל
					</Button>
					<Button
						color="primary"
						onClick={() => {
							handleFormSubmit();
						}}
					>
						{_id ? 'עדכן' : 'שמור'}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
