import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import PrivacyTextComp from './PrivacyText';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function PrivacyDialogComp(props) {
	return (
		<div>
			<Dialog
				open={props.open}
				TransitionComponent={Transition}
				keepMounted
				onClose={props.handleClose}
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle>{'תנאי השימוש ומדיניות פרטיות'}</DialogTitle>
				<DialogContent>
					<PrivacyTextComp />
				</DialogContent>
				<DialogActions>
					<Button onClick={props.handleClose}>סגור</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
