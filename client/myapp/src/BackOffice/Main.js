import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import SwichPageComp from './SwitchPage';
import CloseIcon from '@material-ui/icons/Close';
import { Link, useRouteMatch } from 'react-router-dom';
import { Box, Button } from '@material-ui/core';
import authService from '../authService';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		color: theme.palette.getContrastText('#ffffff'),
		backgroundColor: '#ffffff',
		'&:hover': {
			backgroundColor: '#ffffff',
		},
		[theme.breakpoints.down('sm')]: {
			display: 'block',
		},
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'center',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
	currentPageButton: {
		border: '1px solid ' + theme.palette.getContrastText('#ffffff'),
		borderRadius: 10,
	},
	emailbox: {
		position: 'absolute',
		right: '0px',
		display: 'flex',
		padding: '10px',
		[theme.breakpoints.down('sm')]: {
			color: '#000000',
			position: 'relative',
			display: 'none',
		},
	},
	emailboxdrawer: { justifyContent: 'center', paddingBottom: '10px' },

	email: {
		padding: '10px',
	},
	emaildrawer: { padding: '10px' },

	avatardrawer: {
		display: 'flex',
		justifyItems: 'center',
		justifyContent: 'center',
	},
	orange: {
		color: theme.palette.getContrastText(deepOrange[500]),
		backgroundColor: deepOrange[500],
	},
}));

export default function PersistentDrawerLeft(props) {
	let { path, url } = useRouteMatch();

	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const [role, setRole] = useState();

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
	let history = useHistory();
	let location = useLocation();

	useEffect(async () => {
		try {
			const resp = await authService.getRole();
			console.log(resp.data.userRole);
			setRole(resp.data.userRole);
		} catch (err) {
			console.log(err.response.data.auth || err.response.data.role == 'none');
			if (!err.response.data.auth || err.response.data.role == 'none') {
			}
		}

		console.log(location.pathname);
	}, []);

	const logout = () => {
		history.push('/login');
		sessionStorage.removeItem('token');
		sessionStorage.removeItem('email');
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, open && classes.hide)}
					>
						<MenuIcon />
					</IconButton>

					{['Admin', 'BD'].includes(role) && (
						<Button
							disableRipple={true}
							className={clsx(
								location.pathname == '/backoffice/jobs' &&
									classes.currentPageButton
							)}
							color="inherit"
							component={Link}
							to={`${url}/jobs`}
						>
							משרות
						</Button>
					)}
					{['Admin', 'BD'].includes(role) && (
						<Button
							disableRipple={true}
							className={clsx(
								location.pathname == '/backoffice/candidates' &&
									classes.currentPageButton
							)}
							color="inherit"
							component={Link}
							to={`${url}/candidates`}
						>
							מועמדים
						</Button>
					)}
					{['Admin'].includes(role) && (
						<Button
							disableRipple={true}
							className={clsx(
								location.pathname == '/backoffice/schedule' &&
									classes.currentPageButton
							)}
							color="inherit"
							component={Link}
							to={`${url}/schedule`}
						>
							לו"ז
						</Button>
					)}
					{['Admin'].includes(role) && (
						<Button
							disableRipple={true}
							className={clsx(
								location.pathname == '/backoffice/users' &&
									classes.currentPageButton
							)}
							color="inherit"
							component={Link}
							to={`${url}/users`}
						>
							משתמשים
						</Button>
					)}
					{['Admin', 'BD'].includes(role) && (
						<Button color="inherit" onClick={logout}>
							<ExitToAppIcon />
						</Button>
					)}

					<span className={classes.emailbox}>
						<span className={classes.email}>
							{sessionStorage['email'] ? sessionStorage['email'] : ''}
						</span>
						<Avatar className={clsx(classes.orange, classes.avatar)}>
							{sessionStorage['email']
								? sessionStorage['email'][0].toUpperCase()
								: ''}
						</Avatar>
					</span>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div>
					<IconButton onClick={handleDrawerClose}>
						<CloseIcon />
					</IconButton>
				</div>

				<div className={classes.drawerHeader}>
					<span className={classes.emailboxdrawer}>
						<div className={classes.avatardrawer}>
							<Avatar className={clsx(classes.orange, classes.avatardrawer)}>
								{sessionStorage['email']
									? sessionStorage['email'][0].toUpperCase()
									: ''}
							</Avatar>
						</div>
						<span className={classes.emaildrawer}>
							{sessionStorage['email'] ? sessionStorage['email'] : ''}
						</span>
					</span>{' '}
				</div>

				<Divider />
				<List>
					{['Admin', 'BD'].includes(role) && (
						<ListItem button component={Link} to={`${url}/jobs`}>
							<ListItemIcon>{/* <InboxIcon /> */}</ListItemIcon>
							<ListItemText primary="משרות" />
						</ListItem>
					)}

					{['Admin', 'BD'].includes(role) && (
						<ListItem button component={Link} to={`${url}/candidates`}>
							<ListItemIcon>{/* <InboxIcon /> */}</ListItemIcon>
							<ListItemText primary="מועמדים" />
						</ListItem>
					)}
					{['Admin'].includes(role) && (
						<ListItem button component={Link} to={`${url}/users`}>
							<ListItemIcon>{/* <InboxIcon /> */}</ListItemIcon>
							<ListItemText primary="משתמשים" />
						</ListItem>
					)}
					{['Admin'].includes(role) && (
						<ListItem button component={Link} to={`${url}/schedule`}>
							<ListItemIcon>{/* <InboxIcon /> */}</ListItemIcon>
							<ListItemText primary='לו"ז' />
						</ListItem>
					)}
					<Divider />
					{['Admin', 'BD'].includes(role) && (
						<ListItem button onClick={logout}>
							<ListItemIcon>{/* <InboxIcon /> */}</ListItemIcon>
							<ListItemText primary="התנתק" />
						</ListItem>
					)}
				</List>
			</Drawer>
			<main
				className={clsx(classes.content, {
					[classes.contentShift]: open,
				})}
			>
				<div className={classes.drawerHeader} />
				<Typography paragraph component={'span'}>
					<SwichPageComp />
				</Typography>

				<Box mt={3}>
					<Typography align="center" paragraph>
						{' '}
						כל הזכויות שמורות לאתר placement company name Ⓒ 2021
					</Typography>
				</Box>
			</main>
		</div>
	);
}
