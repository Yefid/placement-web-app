import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function SingleOptionComp(props) {
	const [value, setValue] = React.useState('');
	const [inputValue, setInputValue] = React.useState('');

	return (
		<div>
			<Autocomplete
				value={props.storedValue ? props.storedValue : ''}
				onChange={(event, newValue) => {
					setValue(newValue);
					props.getValue(props.name, newValue);
				}}
				inputValue={inputValue}
				onInputChange={(event, newInputValue) => {
					setInputValue(newInputValue);
				}}
				options={props.data ? props.data : ['']}
				renderInput={(params) => (
					<TextField
						margin="dense"
						variant="outlined"
						fullWidth
						{...params}
						label={props.label}
					/>
				)}
			/>
		</div>
	);
}
