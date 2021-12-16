/* eslint-disable no-use-before-define */

import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { FormControlLabel } from '@material-ui/core';
import { getThemeProps } from '@material-ui/styles';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function TagsComp(props) {
	const [values, SetValues] = useState([]);

	const sendValues = (e, values) => {
		props.getValues(props.name, values);
	};
	return (
		<Autocomplete
			multiple
			freeSolo
			options={props.data ? props.data?.map((option) => option) : ['']}
			disableCloseOnSelect
			value={props.storedValues ? props.storedValues : ['']}
			getOptionLabel={(option) => option}
			renderOption={(option, { selected }) => (
				<React.Fragment>
					<Checkbox
						icon={icon}
						checkedIcon={checkedIcon}
						style={{ marginRight: 8 }}
						checked={selected}
					/>
					{option}
				</React.Fragment>
			)}
			onChange={(e, values) => sendValues(e, values)}
			renderInput={(params) => (
				<TextField
					{...params}
					variant="outlined"
					margin="dense"
					label={props.label}
					placeholder="ניתן להוסיף טקסט חופשי"
				/>
			)}
		/>
	);
}
