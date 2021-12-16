import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {
	Box,
	TextField,
	Typography,
} from '@material-ui/core';
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

export default function AddAndUpdateJobContactDialog({
	open,
	handleClose,
	data,
	onChange,
	handleFormSubmit,
}) {
	const { _id, companyName, poc, pocEmail, pocPhone, notes } = data;

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
					{_id ? 'עדכן פרטי איש קשר' : 'פרטי איש קשר חדש'}
				</DialogTitle>
				<DialogContent>
					<form>
						<Box pt={'1rem'}>
							<Typography variant="h5">פרטי חברה:</Typography>

							<TextField
								id="companyName"
								value={companyName}
								onChange={(e) => onChange(e)}
								label="שם חברה"
								variant="outlined"
								margin="dense"
								fullWidth
							/>
							<TextField
								id="poc"
								value={poc}
								onChange={(e) => onChange(e)}
								label="איש קשר"
								variant="outlined"
								margin="dense"
								fullWidth
							/>
							<TextField
								id="pocEmail"
								value={pocEmail}
								onChange={(e) => onChange(e)}
								label="אימייל איש קשר"
								variant="outlined"
								margin="dense"
								fullWidth
							/>

							<TextField
								id="pocPhone"
								value={pocPhone}
								onChange={(e) => onChange(e)}
								label="טלפון איש קשר"
								variant="outlined"
								margin="dense"
								fullWidth
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
