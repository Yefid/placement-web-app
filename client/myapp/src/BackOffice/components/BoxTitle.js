import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
	root: {},
	appBar: {
		width: '100%',
		background: 'linear-gradient(to left,#FFFFFF, #DEE0E4 ,#FFFFFF)',
		textAlign: 'center',
		marginBottom: '1em',
	},
	title: {
		width: '100%',
		margin: '0 auto',
		padding: '0.2em',
	},
}));

export default function BoxTitle(props) {
	const classes = useStyles();

	return (
		<div className={classes.appBar}>
			<Typography
				className={classes.title}
				variant="h3"
				component="div"
				gutterBottom
			>
				{props.title}
			</Typography>
		</div>
	);
}
