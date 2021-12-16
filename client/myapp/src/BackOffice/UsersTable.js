import React, { useState, useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './Ag-grid-custom.css';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import utils from '../utils/usersUtils/utils';
import AddUser from './AddUser';

const useStyles = makeStyles({
	table: {
		width: '100%',
	},
});

function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
}

export default function UsersTableComp() {
	const classes = useStyles();

	const [allUsers, setAllUsers] = useState([]);
	const [rows2, setrows2] = useState([]);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [role, setRole] = useState('');
	const [totalMinInSystem, setTotalMinInSystem] = useState(0);

	useEffect(async () => {
		const resp = await utils.getAllUsers();
		console.log(resp.data);
		setrows2(resp.data);
	}, []);

	const onChange = (e) => {
		let value = e.target.value;
		if (e.target.id == 'email') {
			setEmail(value);
		} else if (e.target.id == 'password') {
			setPassword(value);
		} else if (e.target.id == 'role') {
			setRole(value);
		} else if (e.target.id == 'totalMinInSystem') {
			setTotalMinInSystem(value);
		}
		
	};

	const sendForm = async () => {
		const data = { email, password, role, totalMinInSystem };
		console.log(data);
		const resp = await utils.addUser(data);
		console.log(resp.data);
	};
	return (
		<div>
			{allUsers?.map((x) => {
				return <div>{x.email}</div>;
			})}
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>id</TableCell>
							<TableCell align="center">email</TableCell>
							<TableCell align="center">password</TableCell>
							<TableCell align="center">createdDate</TableCell>
							<TableCell align="center">role</TableCell>
							<TableCell align="center">totalMinInSystem</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows2?.map((row) => (
							<TableRow key={row.id}>
								<TableCell component="th" scope="row">
									{row._id}
								</TableCell>
								<TableCell align="center">{row.email}</TableCell>
								<TableCell align="center">{row.password}</TableCell>
								<TableCell align="center">{row.createdDate}</TableCell>
								<TableCell align="center">{row.role}</TableCell>
								<TableCell align="center">{row.totalMinInSystem}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<AddUser
				email={email}
				password={password}
				role={role}
				totalMinInSystem={totalMinInSystem}
				onChange={onChange}
				sendForm={sendForm}
			/>
			דרך פעולה:
			<br />
			1. מחיקה דרך הדטה בייס
			<br />
			2. עדכון מתבצע על ידי מחיקה מהדטה בייס והוספת משתמש חדש
		</div>
	);
}
