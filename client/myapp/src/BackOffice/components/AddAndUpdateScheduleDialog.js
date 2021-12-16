import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';

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
export default function AddAndUpdateScheduleDialog({
	open,
	handleClose,
	data,
	onChange,
	handleFormSubmit,
	candidatesData,
	jobsData,
}) {
	const classes = useStyles();
	const { _id, candidateId, jobId, status } = data;

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
						<TextField
							variant="outlined"
							id="dateTime"
							label="Next appointment"
							type="datetime-local"
							margin="dense"
							onChange={(e) => onChange(e)}
							className={classes.textField}
							InputLabelProps={{
								shrink: true,
							}}
						/>
						<Autocomplete
							id="candidateName"
							options={candidatesData}
							//options={top100Films}
							getOptionLabel={(option) => option.name}
							//style={{ width: '100%' }}
							renderInput={(params) => (
								<TextField
									{...params}
									label="שם המועמד"
									variant="outlined"
									margin="dense"
								/>
							)}
							fullWidth
							onChange={(event, newValue) => {
								onChange(event, newValue);
							}}
						/>
						<TextField
							id="candidateId"
							value={candidateId}
							onChange={(e) => onChange(e)}
							label="מס מזהה מועמד"
							variant="outlined"
							margin="dense"
							fullWidth
							disabled
						/>{' '}
						<Autocomplete
							id="jobDescriprion"
							options={jobsData}
							getOptionLabel={(option) => option.jobDescriprion}
							renderInput={(params) => (
								<TextField
									{...params}
									label="שם המשרה"
									variant="outlined"
									margin="dense"
								/>
							)}
							fullWidth
							onChange={(event, newValue) => {
								onChange(event, newValue);
							}}
						/>
						<TextField
							id="jobId"
							value={jobId}
							onChange={(e) => onChange(e)}
							label="מס מזהה משרה"
							variant="outlined"
							margin="dense"
							fullWidth
							disabled
						/>
						<TextField
							id="status"
							value={status}
							onChange={(e) => onChange(e)}
							label="סטטוס"
							variant="outlined"
							margin="dense"
							fullWidth
						/>
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
