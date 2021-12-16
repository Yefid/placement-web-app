import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './Ag-grid-custom.css';
import { Grid, TextField, Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import AddAndUpdateJobContactDialog from './components/AddAndUpdateJobContactDialog';
import utils from '../utils/jobContactsUtils/utils';
import utilsIndustries from '../utils/industriesUtils/utils';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { isIsoDate, parseISOString } from '../helpers/datetimeHandle';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { ReactComponent as CsvIcon } from '../img/csv.svg';
import { ReactComponent as AddContactIcon } from '../img/addContact.svg';
import Zoom from '@material-ui/core/Zoom';
import Tooltip from '@material-ui/core/Tooltip';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		backgroundColor: 'transparent',

		padding: theme.spacing(0),
		textAlign: 'left',
		color: theme.palette.text.secondary,
	},
}));

export default function JobContactsTableComp(props) {
	const classes = useStyles();
	const theme = useTheme();

	const initialFormValue = {
		_id: '',
		contactId: '',
		creationDate: '',
		companyName: '',
		poc: '',
		pocEmail: '',
		pocPhone: '',
		notes: '',
	};

	const [industries, setIndustries] = useState([]);

	// set to default data
	const [gridColumnApi, setGridColumnApi] = useState(null);

	const [gridApi, setGridApi] = useState(null);
	const [rowData, setRowData] = useState();
	const [colDefs, setColDefs] = useState([
		{
			field: '_id',
			headerName: '',

			cellRendererFramework: (params) => (
				<div>
					<Grid
						style={{
							display: 'flex',
						}}
					>
						<Grid
							style={{
								display: 'flex',
								alignItems: 'center',
								flexWrap: 'wrap',
								marginLeft: '5px',
							}}
						>
							<DeleteForeverIcon
								className="fa fa-plus-circle"
								color="primary"
								fontSize="small"
								onClick={() => handleDelete(params.value)}
								style={{ cursor: 'pointer' }}
							/>
						</Grid>

						<Grid
							style={{
								display: 'flex',
								alignItems: 'center',
								flexWrap: 'wrap',
								marginLeft: '5px',
							}}
						>
							<EditIcon
								className="fa fa-plus-circle"
								color="primary"
								fontSize="small"
								onClick={() => handleUpdate(params.data)}
								style={{ cursor: 'pointer' }}
							/>
						</Grid>
						<Grid
							style={{
								display: 'flex',
								alignItems: 'center',
								flexWrap: 'wrap',
								marginLeft: '5px',
							}}
						></Grid>
					</Grid>
				</div>
			),
			editable: false,
			width: 100,
		},
		{
			field: 'creationDate', //sorting UTC time but displaying local time
			headerName: 'תאריך יצירה',
			sort: 'desc',
			cellRendererFramework: (params) => (
				<Grid
					style={{
						display: 'flex',
					}}
				>
					{params.data.creationDate1}
				</Grid>
			),
			editable: false,
		},
		{ field: 'companyName', headerName: 'שם חברה', width: 100 },

		{ field: 'poc', headerName: 'איש קשר', width: 100 },
		{ field: 'pocEmail', headerName: 'איש קשר - Email', width: 100 },
		{ field: 'pocPhone', headerName: 'איש קשר - טלפון', width: 100 },
		{
			field: 'notes',
			headerName: 'הערות',
			tooltipField: 'notes',
			width: 200,
			suppressSizeToFit: true,
		},
		{ field: '_id', headerName: 'id', width: 100 },
	]);
	const [open, setOpen] = React.useState(false);

	const [formData, setFormData] = useState(initialFormValue);

	// load the data after the grid has been setup
	//[] means on first render so no need to memo the results at this point
	React.useEffect(() => {}, []);

	const autoSizeAll = (skipHeader) => {
		var allColumnIds = [];
		gridColumnApi.getAllColumns().forEach(function (column) {
			allColumnIds.push(column.colId);
		});
		gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
	};

	function sizeToFit() {
		gridColumnApi.sizeColumnsToFit();
	}

	const getIndustries = async () => {
		const resp = await utilsIndustries.getAllIndustries();

		return resp.data;
	};
	const getNewJobContactNumber = async () => {
		const resp = await utils.getAllJobContacts();

		const allJobContacts = resp.data;
		const jobContactNumbers = allJobContacts.map((x) => {
			return x.contactId;
		});
		return Math.max(...jobContactNumbers) + 1;
	};

	const handleClickOpen = async () => {
		setOpen(true);

		if (formData._id == '') {
			const newJobContactNumber = await getNewJobContactNumber();
			setFormData({ ...formData, ['contactId']: newJobContactNumber });
		}
		const tempIndustries = await getIndustries();

		setIndustries(tempIndustries);
	};

	const handleClose = () => {
		props.setIsJobContactsChanged((isChanged) => !isChanged);
		setOpen(false);
		setFormData(initialFormValue);
	};

	const rowDataModification = async (data) => {
		let modifiedData = [];
		data.forEach((x) => {
			let tempObj = {};

			Object.keys(x).map(function (key, index) {
				if (Array.isArray(x[key])) {
					tempObj[key] = x[key].join();
				} else if (isIsoDate(x[key])) {
					tempObj[key] = x[key];
					tempObj[key + '1'] = parseISOString(x[key]);
				} else {
					tempObj[key] = x[key];
				}
			});
			modifiedData.push(tempObj);
		});

		setRowData(modifiedData);
	};

	const getJobContacts = async () => {
		const resp = await utils.getAllJobContacts();
		console.log(resp.data);
		rowDataModification(resp.data);
	};

	const onChange = (e, valueFromSelect, selectId) => {
		const { value, id } = e.target;
		if (!selectId) {
			setFormData({ ...formData, [id]: value });
		} else {
			// if it is a select component get the value and the id from the other variables

			setFormData({ ...formData, [selectId]: value });
		}
	};
	function onFilterTextBoxChanged(value) {
		gridApi.setQuickFilter(value);
	}
	const handleFormSubmit = async () => {
		if (formData._id) {
			const resp = await utils.updateJobContact(formData._id, formData);
		} else {
			const resp = await utils.addJobContact(formData);
		}
		handleClose();
		getJobContacts();
	};

	const onGridReady = async (params) => {
		await getJobContacts();
		setGridApi(params.api);
		setGridColumnApi(params.columnApi);
	};

	const onFirstDataRendered = (params) => {};

	const handleDelete = async (id) => {
		const confirm = window.confirm('האם למחוק את הרשומה ?', id);

		if (confirm) {
			let resp = await utils.deleteJobContact(id);
			console.log(resp.data);
			getJobContacts();
		}
	};

	const handleUpdate = async (rowData) => {
		setFormData(rowData);
		setOpen(true);
		const tempIndustries = await getIndustries();
		//************** */
		console.log(tempIndustries);
		setIndustries(tempIndustries);
	};

	const onExportClick = () => {
		console.log(gridApi);
		gridApi.exportDataAsCsv({ onlySelected: true });
	};

	return (
		<div>
			<div className={classes.root}>
				<Box mb={1}>
					<Zoom in={true} style={{ transitionDelay: true ? '500ms' : '0ms' }}>
						<Typography>אנשי קשר : </Typography>
					</Zoom>
				</Box>
				<Box mb={1}>
					<Grid
						container
						spacing={2}
						justifycontent="flex-start"
						alignItems="center"
					>
						<Grid item>
							<Zoom
								in={true}
								style={{ transitionDelay: true ? '500ms' : '0ms' }}
							>
								<Paper elevation={0} className={classes.paper}>
									{' '}
									<TextField
										size="small"
										label="חיפוש מהיר"
										variant="outlined"
										//
										onChange={(e) => onFilterTextBoxChanged(e.target.value)}
									></TextField>
								</Paper>
							</Zoom>
						</Grid>
						<Grid item>
							<Zoom
								in={true}
								style={{ transitionDelay: true ? '500ms' : '0ms' }}
							>
								<Paper elevation={0} className={classes.paper}>
									<Tooltip title="הוסף איש קשר">
										<AddContactIcon
											fill={theme.palette.primary.main}
											style={{ cursor: 'pointer' }}
											onClick={() => handleClickOpen()}
										/>
									</Tooltip>
								</Paper>
							</Zoom>
						</Grid>
						<Grid item>
							<Zoom
								in={true}
								style={{ transitionDelay: true ? '500ms' : '0ms' }}
							>
								<Paper elevation={0} className={classes.paper}>
									<Tooltip title="יצא אנשי קשר לקובץ אקסל">
										<CsvIcon
											onClick={() => onExportClick()}
											fill={theme.palette.primary.main}
											style={{ cursor: 'pointer' }}
										/>
									</Tooltip>
								</Paper>
							</Zoom>
						</Grid>

						<Grid item></Grid>
					</Grid>
				</Box>
			</div>

			<AddAndUpdateJobContactDialog
				open={open}
				handleClose={handleClose}
				data={formData}
				onChange={onChange}
				handleFormSubmit={handleFormSubmit}
				industries={industries}
			/>
			<Zoom in={true} style={{ transitionDelay: true ? '500ms' : '0ms' }}>
				<div
					className="ag-theme-balham"
					style={{ height: 400, maxWidth: 1200 }}
				>
					<AgGridReact
						defaultColDef={{
							sortable: true,
							filter: true,
							resizable: true,
							floatingFilter: true,
							headerClass: 'header_new',
						}}
						pagination={true}
						rowData={rowData}
						columnDefs={colDefs}
						enableRtl={true}
						onGridReady={onGridReady}
						onFirstDataRendered={onFirstDataRendered}
						rowSelection={'multiple'}
						rowMultiSelectWithClick={true}
						enableBrowserTooltips={true}
						enableCellTextSelection={true}
					></AgGridReact>
				</div>
			</Zoom>
		</div>
	);
}
