import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		maxWidth: 300,
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	chip: {
		margin: 2,
	},
	noLabel: {
		marginTop: theme.spacing(3),
	},
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const names = [
	'אנליסט',
	'בנקאות',
	'גבייה',
	'הנהלת חשבונות',
	'חשבות',
	'חשבות שכר',
	'כלכלה',
	'מנהל כספים',
	'אחר',
];

function getStyles(name, personName, theme) {
	return {
		fontWeight:
			personName.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

export default function MultipleSelectComp() {
	const classes = useStyles();

	const theme = useTheme();
	const [personName, setPersonName] = React.useState([]);

	const handleChange = (event) => {
		setPersonName(event.target.value);
	};

	return (
		<div>
			<FormControl className={classes.formControl}>
				<InputLabel>השכלה</InputLabel>
				<Select
					margin="dense"
					variant="outlined"
					multiple
					value={personName}
					onChange={handleChange}
					input={<Input />}
					renderValue={(selected) => (
						<div className={classes.chips}>
							{selected.map((value) => (
								<Chip key={value} label={value} className={classes.chip} />
							))}
						</div>
					)}
					MenuProps={MenuProps}
				>
					{names.map((name) => (
						<MenuItem
							key={name}
							value={name}
							style={getStyles(name, personName, theme)}
						>
							{name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}
