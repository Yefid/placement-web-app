import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Mailer from './Mailer';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
	
	const handleClose = () => {
		props.setIsMailerVisible(false);
	};

	return (
		<div>
			
			<Dialog
				open={props.isMailerVisible}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
				fullWidth={true}
				maxWidth={'md'}

			>
				<DialogTitle id="alert-dialog-slide-title">{'הודעה חדשה'}</DialogTitle>
				<DialogContent>
					<Mailer isMailerVisible={props.isMailerVisible} setIsMailerVisible={props.setIsMailerVisible} />
				</DialogContent>
				
			</Dialog>
		</div>
	);
}
