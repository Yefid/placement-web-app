import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
	formControl: {
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

export default function SingleSelectComp() {
	const classes = useStyles();
	const [age, setAge] = React.useState('');

	const handleChange = (event) => {
		setAge(event.target.value);
	};

	return (
		<div>
			<FormControl
				margin="dense"
				variant="outlined"
				className={classes.formControl}
				fullWidth
			>
				<InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
				<Select
					labelId="demo-simple-select-helper-label"
					id="demo-simple-select-helper"
					value={age}
					onChange={handleChange}
				>
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					<MenuItem value={10}>Ten</MenuItem>
					<MenuItem value={20}>Twenty</MenuItem>
					<MenuItem value={30}>Thirty</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
}
