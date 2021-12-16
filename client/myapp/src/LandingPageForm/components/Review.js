import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Box, Button, Link, TextField } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import utils from '../../utils/uploadUtils/utils';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import path from 'path';

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
}));
export default function Review(props) {
	const storeData = useSelector((state) => state);
	const dispatch = useDispatch();
	const classes = useStyles();
	const [value, setValue] = useState('');
	const [file, SetFile] = useState('');

	const send = async (event) => {
		const fullname =
			storeData.candidateData.fname + '-' + storeData.candidateData.lname;
		const data = new FormData();
		const ext = path.extname(event.target.files[0].name);
		const name = fullname + '-CV-' + Date.now() + ext;
		data.append('name', name);
		data.append('file', event.target.files[0]);
		props.setIsUploading(true);
		await utils
			.uploadFile(data)
			.then((res) => {
				dispatch({
					type: 'SETCANDIDATE',
					payload: { driveId: res.data.id },
				});

				dispatch({
					type: 'SETCANDIDATE',
					payload: { cvContent: res.data.content },
				});
				props.setIsUploading(false);
			})
			.catch((err) => console.log(err));

		dispatch({
			type: 'SETCANDIDATE',
			payload: { cv: name },
		});
	};

	const handleChange = (event) => {
		dispatch({
			type: 'SETCANDIDATE',
			payload: { freeText: event.target.value },
		});
	};

	const isName = () => {};
	return (
		<React.Fragment>
			<Box align="right">
				<TextField
					id="outlined-multiline-static"
					label="עוד משהו שאנחנו צריכים לדעת ?"
					multiline
					rows={4}
					variant="outlined"
					margin="dense"
					variant="outlined"
					fullWidth
					name="freeText"
					value={storeData.candidateData?.freeText}
					onChange={handleChange}
				/>
			</Box>

			<br />

			<Box align="right" alignItems="center">
				<Grid
					container
					direction="row"
					justifyContent="flex-start"
					alignItems="center"
				>
					<Grid>
						<Button
							variant="outlined"
							component="label"
							color="secondary"
							startIcon={<CloudUploadIcon />}
							onClick={() => {
								if (!props.acceptTerms) {
									alert(
										'כדי לשלוח את קורות החיים יש לאשר את תנאי השימוש ומדיניות הפרטיות'
									);
									return;
								}
							}}
						>
							הוספת קורות חיים
							{props.acceptTerms && (
								<input
									name="file"
									type="file"
									onChange={(e) => {
										send(e);
									}}
									hidden
								/>
							)}
						</Button>{' '}
					</Grid>
					{storeData.candidateData.cv && (
						<Grid
							container
							direction="row"
							justifyContent="flex-start"
							alignItems="center"
						>
							<Grid>
								<DoneAllIcon />
							</Grid>
							<Grid>
								<Typography variant="body1">הקובץ נשלח בהצלחה </Typography>
							</Grid>
						</Grid>
					)}
				</Grid>
			</Box>
		</React.Fragment>
	);
}
