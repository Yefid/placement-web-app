import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Box, Grid } from '@material-ui/core';
import MainContactComp from './components/MainContact';
import JobDescriprionComp from './components/JobDescription';
import landingUtils from '../utils/landingUtils/utils';
import { useDispatch } from 'react-redux';
import Background from '../img/unsplash_XgeZu2jBaVI.jpg';

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: 'relative',
	},
	layout: {
		width: 'auto',
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
			width: 600,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		padding: theme.spacing(2),

		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(3),
			marginBottom: theme.spacing(3),
			padding: theme.spacing(3),
		},
		backgroundColor: 'rgba(255, 255, 255, 0.95)',
	},
	stepper: {
		padding: theme.spacing(3, 0, 5),
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
	},
	main: {
		paddingBottom: '270px',
		backgroundImage: `url(${Background})`,
		height: '100%',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
	},
}));
function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

export default function Checkout(props) {
	const classes = useStyles();
	const dispatch = useDispatch();

	useEffect(async () => {
		const resp = await landingUtils.getLandingJob(props.match.params.id);
		dispatch({ type: 'SET', payload: { jobData: { ...resp.data } } });
	}, []);

	return (
		<React.Fragment>
			<CssBaseline />

			<Box p={3} className={classes.main}>
				<Grid container spacing={3}>
					<Grid item sm={6} xs={12}>
						<Paper className={classes.paper}>
							<JobDescriprionComp jobId={props.match.params.id} />
						</Paper>
					</Grid>
					<Grid item sm={6} xs={12}>
						<Paper className={classes.paper}>
							<MainContactComp jobId={props.match.params.id} />
						</Paper>
					</Grid>
				</Grid>
				<Copyright />
			</Box>
		</React.Fragment>
	);
}
