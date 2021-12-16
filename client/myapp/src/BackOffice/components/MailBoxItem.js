import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import { TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SingleOptionComp from './SingleOption';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		flexGrow: 1,
		paddingBottom: '0px',
	},

	paper: {
		backgroundColor: 'transparent',

		padding: theme.spacing(1),
		color: theme.palette.text.secondary,
	},

	listWrap: {
		borderBottom: '1px solid #bbbfbe',
		color: 'black',
	},
}));

export default function MailBoxItem(props) {
	const classes = useStyles();
	const [checked, setChecked] = React.useState(false);

	const handleToggle = (value) => () => {
		props.checkBoxSelection(value, props.index, !checked);
		setChecked(!checked);
	};

	return (
		<ListItem
			className={classes.listWrap}
			role={undefined}
			dense
			button
			index={props.index}
		>
			<ListItemIcon>
				<Checkbox
					edge="start"
					checked={props.messagesData[props.index].isChecked}
					tabIndex={-1}
					disableRipple
					inputProps={{ 'aria-labelledby': props.labelId }}
					onClick={handleToggle(props.value)}
				/>
			</ListItemIcon>

			<Grid
				container
				spacing={1}
				justifycontent="space-evenly"
				alignItems="flex-start"
			>
				<Grid item xs={12} sm={2}>
					<Paper elevation={0} className={classes.paper}>
						{props.value?.date}
					</Paper>
				</Grid>
				<Grid item xs={12} sm={2}>
					<Paper elevation={0} className={classes.paper}>
						{props.value?.from}
					</Paper>
				</Grid>
				<Grid item xs={12} sm={2}>
					<Paper elevation={0} className={classes.paper}>
						<TextField
							variant="outlined"
							fullWidth
							name="subject"
							label="שם"
							id="subject"
							onChange={(e) => props.setSubject(e.target.value, props.index)}
							multiline
							size="small"
							value={props.value?.subject}
						/>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={2}>
					<Paper elevation={0} className={classes.paper}>
						<TextField
							variant="outlined"
							fullWidth
							name="filename"
							label="שם קובץ"
							disabled
							id="filename"
							size="small"
							onChange={(e) => props.setFileName(e.target.value, props.index)}
							value={props.value?.filename}
						/>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={2}>
					<Paper elevation={0} className={classes.paper}>
						<SingleOptionComp
							label="משרה"
							data={props.jobNumberAndDescriptionList}
							name="job"
							getValue={(label, value) =>
								props.getValue(label, value, props.index)
							}
							storedValue={
								props.messagesData[props.index].job
									? props.messagesData[props.index].job
									: ''
							}
							helperText={props.value?.jobFromMail}
						/>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={2}>
					<Paper elevation={0} className={classes.paper}>
						<TextField
							variant="outlined"
							fullWidth
							name="subject"
							label="גוף המייל"
							type="mailBody"
							id="mailBody"
							size="small"
							onChange={(e) => props.setMailBody(e.target.value, props.index)}
							value={props.value?.mailBody ? props.value?.mailBody : ''}
						/>
					</Paper>
				</Grid>
			</Grid>
		</ListItem>
	);
}
