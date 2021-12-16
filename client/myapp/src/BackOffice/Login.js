import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import authsrv from '../authService';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function LoginComp(props) {
	let history = useHistory();

	const classes = useStyles();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const login = (e) => {
		e.preventDefault();
		authsrv
			.login(email, password)
			.then((resp) => {
				if (resp.status == 200) {
					let token = resp.data.token;
					let role = resp.data.role;
					authsrv.saveToken(token, email);
					console.log(token);
					history.push('/backoffice/jobs');
				}
			})
			.catch((error) => {
				console.error(error);
				let token = '';

				let role = '';
				authsrv.saveToken(token, '');
			});
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					התחברות{' '}
				</Typography>
				<form className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="אימייל"
						name="email"
						autoComplete="email"
						autoFocus
						onChange={(e) => setEmail(e.target.value)}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="סיסמא"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="זכור אותי"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={(e) => login(e)}
					>
						התחבר
					</Button>
				</form>
			</div>
		</Container>
	);
}
