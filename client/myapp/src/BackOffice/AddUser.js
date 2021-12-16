import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Box, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
}));

export default function AddUser(props) {
	const classes = useStyles();

	return (
		<div>
			<Box mt={3}>
				הוספת משתמש:
				<form className={classes.root} noValidate autoComplete="off">
					<TextField
						id="email"
						label="email"
						variant="outlined"
						value={props.email}
						onChange={props.onChange}
					/>
					<TextField
						id="password"
						label="password"
						variant="outlined"
						value={props.password}
						onChange={props.onChange}
					/>
					<TextField
						id="role"
						label="role"
						variant="outlined"
						value={props.role}
						onChange={props.onChange}
					/>
					<TextField
						id="totalMinInSystem"
						label="totalMinInSystem"
						variant="outlined"
						value={props.totalMinInSystem}
						onChange={props.onChange}
					/>

					<Button onClick={props.sendForm}>שלח</Button>
				</form>
			</Box>
		</div>
	);
}
