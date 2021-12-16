import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export default function ContactInfo(props) {
	const storeData = useSelector((state) => state);
	const dispatch = useDispatch();
	const [IsFnameEmpty, setisFnameEmpty] = useState(true);
	const [IsLnameEmpty, setisLnameEmpty] = useState(true);
	const [IsPhoneEmpty, setisPhoneEmpty] = useState(true);
	const [IsEmailEmpty, setisEmailEmpty] = useState(true);

	const setFname = (e) => {
		setisFnameEmpty(e.target.value ? false : true);
		props.setMarkRequiredFields(false);

		dispatch({ type: 'SETCANDIDATE', payload: { fname: e.target.value } });
	};

	const setLname = (e) => {
		setisLnameEmpty(e.target.value ? false : true);
		props.setMarkRequiredFields(false);
		dispatch({ type: 'SETCANDIDATE', payload: { lname: e.target.value } });
	};
	const setPhone = (e) => {
		setisPhoneEmpty(e.target.value ? false : true);
		props.setMarkRequiredFields(false);

		dispatch({ type: 'SETCANDIDATE', payload: { phone: e.target.value } });
	};
	const setEmail = (e) => {
		setisEmailEmpty(e.target.value ? false : true);
		props.setMarkRequiredFields(false);

		dispatch({ type: 'SETCANDIDATE', payload: { email: e.target.value } });
	};
	const setOffers = (e) => {
		dispatch({ type: 'SETCANDIDATE', payload: { offers: e.target.checked } });
	};

	return (
		<React.Fragment>
			<Typography variant="h6" gutterBottom>
				פרטי התקשרות וקורות חיים
			</Typography>

			<Grid container spacing={1}>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="firstName"
						name="firstName"
						label=" שם פרטי"
						margin="dense"
						variant="outlined"
						fullWidth
						onChange={(e) => setFname(e)}
						value={storeData.candidateData?.fname}
						error={IsFnameEmpty && props.markRequiredFields}
						helperText={
							'שדה זה הוא חובה' && IsFnameEmpty && props.markRequiredFields
						}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="lastName"
						name="lastName"
						label="שם משפחה"
						margin="dense"
						variant="outlined"
						fullWidth
						onChange={(e) => setLname(e)}
						value={storeData.candidateData?.lname}
						error={IsLnameEmpty && props.markRequiredFields}
						helperText={
							'שדה זה הוא חובה' && IsLnameEmpty && props.markRequiredFields
						}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="phone"
						name="phone"
						label="טל' נייד"
						margin="dense"
						variant="outlined"
						fullWidth
						onChange={(e) => setPhone(e)}
						value={storeData.candidateData?.phone}
						error={IsPhoneEmpty && props.markRequiredFields}
						helperText={
							'שדה זה הוא חובה' && IsPhoneEmpty && props.markRequiredFields
						}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="email"
						name="email"
						label="אימייל"
						margin="dense"
						variant="outlined"
						fullWidth
						onChange={(e) => setEmail(e)}
						value={storeData.candidateData?.email}
						error={IsEmailEmpty && props.markRequiredFields}
						helperText={
							'שדה זה הוא חובה' && IsEmailEmpty && props.markRequiredFields
						}
					/>
				</Grid>

				<Grid item xs={12}></Grid>
			</Grid>
			<Typography variant="subtitle1" color="primary" gutterBottom>
				* אם נרשמת בעבר אנא מלא/י את את הפרטים בעמוד זה בלבד כדי שנוכל לדעת
				שאת/ה מעוניין/ת במשרה{' '}
			</Typography>
		</React.Fragment>
	);
}
