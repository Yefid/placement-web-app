import * as React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function SimpleSnackbar(props) {
	const action = (
		<React.Fragment>
			<IconButton
				size="small"
				aria-label="close"
				color="inherit"
				onClick={props.handleClose}
			>
				<CloseIcon fontSize="small" />
			</IconButton>
		</React.Fragment>
	);

	return (
		<div>
			<Snackbar
				open={props.open}
				autoHideDuration={6000}
				onClose={props.handleClose}
				message={props.messege}
				action={action}
			/>
		</div>
	);
}
