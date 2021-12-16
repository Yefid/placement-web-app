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

import {
	Avatar,
	Box,
	Checkbox,
	FormControlLabel,
	Grid,
	Icon,
} from '@material-ui/core';
import logo from '../img/logo2.png';
import { useSelector } from 'react-redux';

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
		height: '180px',
		width: '180px',
		margin: 'auto',
	},
}));

export default function MainPage() {
	const classes = useStyles();

	return (
		<div>
			<main className={classes.layout}>
				<Box component="span" m={13}>
					<Box justifyContent="center" m={13} mb={3}>
						<Avatar
							className={classes.biggerImage}
							alt="placementcompany"
							src={logo}
						/>
					</Box>

					<Box component="span" m={5}>
						<Typography component="h1" variant="h1" align="center">
							placement company name
						</Typography>
					</Box>
					<Box component="span" m={3}>
						<Typography component="h6" variant="h4" align="center">
							סלוגן
						</Typography>
					</Box>
					<Box component="span" m={3}>
						<Typography
							component="h6"
							variant="h6"
							align="center"
							color="secondary"
						>
							תיאור
						</Typography>
					</Box>
				</Box>
			</main>
		</div>
	);
}
