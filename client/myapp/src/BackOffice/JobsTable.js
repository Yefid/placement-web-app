import React, { useState, useRef } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
//import 'ag-grid-enterprise';
//import '@ag-grid-community/csv-export';
import Tooltip from '@material-ui/core/Tooltip';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './Ag-grid-custom.css';
import { Grid, TextField, Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Button } from '@material-ui/core';
import AddAndUpdateJobDialog from './components/AddAndUpdateJobDialog';
import utils from '../utils/jobsUtils/utils';
import utilsJobContacts from '../utils/jobContactsUtils/utils';
import Zoom from '@material-ui/core/Zoom';

import utilsIndustries from '../utils/industriesUtils/utils';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { isIsoDate, parseISOString } from '../helpers/datetimeHandle';
import LinkIcon from '@material-ui/icons/Link';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { ReactComponent as PlusIcon } from '../img/plusIcon.svg';
import { ReactComponent as CsvIcon } from '../img/csv.svg';
import { useTheme } from '@material-ui/core/styles';
import JobsContactsTableComp from './JobContactsTable';

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

export default function JobsTableComp() {
	const classes = useStyles();
	const theme = useTheme();

	const initialFormValue = {
		_id: '',
		jobNumber: '',
		creationDate: '',
		company: '',
		companyToPublish: '',
		companyDescription: '',
		jobDescriprion: '',
		jobRequirements: '',
		landingPageLink: '',
		subscriptions: '',
		industryId: '',
		industryName: '',
		notes: '',
		jobContactId: '',
	};

	const [industries, setIndustries] = useState([]);
	const [jobContacts, setJobContacts] = useState([]);
	const refJobContacts = useRef(jobContacts);
	refJobContacts.current = jobContacts; //allows handleupdate function to access the data - https://stackoverflow.com/questions/67617716/ag-grid-prevents-access-to-current-value-of-react-state-variable
	const [poc, setPoc] = useState('');
	const [companyName, setCompanyName] = useState('');
	const [pocEmail, setPocEmail] = useState('');
	const [pocPhone, setPocPhone] = useState('');

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
						>
							<LinkIcon
								className="fa fa-plus-circle"
								color="secondary"
								fontSize="small"
								onClick={() => OpenLandingPage(params.data._id)}
								style={{ cursor: 'pointer' }}
							/>
						</Grid>
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
		{ field: 'jobNumber', headerName: 'מספר משרה', width: 100 },
		{ field: 'jobContactId', headerName: 'מזהה איש קשר', width: 100 },

		{
			field: 'company', //sorting UTC time but displaying local time
			headerName: 'שם החברה',
			sort: 'desc',
			cellRendererFramework: (params) => (
				<Grid
					style={{
						display: 'flex',
					}}
				>
					{refJobContacts.current.find((x) => x._id == params.data.jobContactId)
						?.companyName || params.data.company}
				</Grid>
			),

			editable: false,
		},
		{
			field: 'industryName',
			headerName: 'תעשיה',
			tooltipField: 'industryId',
			width: 100,
		},

		{
			field: 'companyToPublish',
			headerName: 'שם חברה לפרסום',
			tooltipField: 'companyToPublish',
			width: 200,
			suppressSizeToFit: true,
		},

		{
			field: 'companyDescription',
			headerName: 'תיאור חברה',
			tooltipField: 'companyDescription',
			width: 200,
			suppressSizeToFit: true,
		},
		{
			field: 'jobDescriprion',
			headerName: 'תיאור תפקיד',
			tooltipField: 'jobDescriprion',
			width: 200,
			suppressSizeToFit: true,
		},
		{
			field: 'jobRequirements',
			headerName: 'דרישות תפקיד',
			tooltipField: 'jobRequirements',
			width: 200,
			suppressSizeToFit: true,
		},
		{
			field: 'notes',
			headerName: 'הערות',
			tooltipField: 'notes',
			width: 200,
			suppressSizeToFit: true,
		},

		{
			field: 'subscriptions',
			headerName: 'מועמדים שנרשמו למשרה',
			tooltipField: 'subscriptions',
			width: 100,
		},

		{
			field: 'landingPageLink',
			headerName: 'דף נחיתה',
			tooltipField: 'landingPageLink',
			width: 100,
		},
		{ field: '_id', headerName: 'id', width: 100 },
		{
			field: '_id',
			headerName: '',
			cellRendererFramework: (params) => (
				<div>
					<Button
						onClick={() => handleDelete(params.value)}
						style={{ height: '20px' }}
						size="small"
						variant="outlined"
					>
						מחק
					</Button>
				</div>
			),
			editable: false,
			width: 100,
		},
	]);
	const [open, setOpen] = React.useState(false);
	const [isJobContactsChanged, setIsJobContactsChanged] = React.useState(false);

	const [formData, setFormData] = useState(initialFormValue);

	React.useEffect(async () => {}, []);
	React.useEffect(async () => {
		const tempIndustries = await getIndustries();
		const tempJobContacts = await getJobContacts();

		setJobContacts(tempJobContacts);
		setIndustries(tempIndustries);
	}, [isJobContactsChanged]);

	const getCompanyDataById = async (id) => {
		const item = await refJobContacts.current.find((x) => x._id == id);
		//console.log(item);
		return item;
	};

	const OpenLandingPage = (jobId) => {
		window.open('../landing/' + jobId, '_blank');
	};

	const getIndustries = async () => {
		console.log('in get industries');
		const resp = await utilsIndustries.getAllIndustries();

		return resp.data;
	};
	const getJobContacts = async () => {
		console.log('in get Contacts');
		const resp = await utilsJobContacts.getAllJobContacts();

		return resp.data;
	};
	const getJobContactById = async (id) => {
		console.log('in get Contact by id');
		const resp = await utilsJobContacts.getJobContact(id);

		return resp.data;
	};

	const getNewJobNumber = async () => {
		const resp = await utils.getAllJobs();

		const allJobs = resp.data;
		const jobNumbers = allJobs.map((x) => {
			return x.jobNumber;
		});
		return Math.max(...jobNumbers) + 1;
	};

	const handleClickOpen = async () => {
		console.log('in handleClickOpen');
		setOpen(true);
		console.log('formData');
		console.log(formData);

		if (formData._id == '') {
			console.log('no id');
			setPoc('');
			setPocEmail('');
			setPocPhone('');
			setCompanyName('');
			const newJobNumber = await getNewJobNumber();
			setFormData({ ...formData, ['jobNumber']: newJobNumber });
		}
	};

	const handleClose = () => {
		setOpen(false);
		setFormData(initialFormValue);
		setCompanyName('');
		setPoc('');
		setPocEmail('');
		setPocPhone('');
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

	const getJobs = async () => {
		const resp = await utils.getAllJobs();
		rowDataModification(resp.data);
		return resp.data;
	};

	const onChange = async (e, idFromSelect, selectId, valueFromSelect) => {
		const { value, id } = e.target;
		if (!selectId) {
			setFormData({ ...formData, [id]: value });
		} else {
			if (selectId == 'jobContactId') {
				const resp = await getJobContactById(idFromSelect);
				setPoc(resp.poc);
				setPocEmail(resp.pocEmail);
				setPocPhone(resp.pocPhone);
				setCompanyName(resp.companyName);
				setFormData({
					...formData,
					[selectId]: value,
					['company']: valueFromSelect,
				});
			} else {
				setFormData({ ...formData, [selectId]: value });
			}
			console.log({ ...formData, [selectId]: value });
		}
	};
	function onFilterTextBoxChanged(value) {
		gridApi.setQuickFilter(value);
	}
	const handleFormSubmit = async () => {
		if (formData._id) {
			const resp = await utils.updateJob(formData._id, formData);
			handleClose();
			getJobs();
		} else {
			const resp = await utils.addJob(formData);
			handleClose();
			getJobs();
		}
	};
	const matchCompanyFields = async (tempJobsData, tempJobContacts) => {
		for await (const jobItem of tempJobsData) {
			console.log('*****************************');
			for await (const jobContactItem of tempJobContacts) {
				if (
					//true &&
					jobItem.jobContactId &&
					jobContactItem._id == jobItem.jobContactId &&
					jobContactItem.companyName != jobItem.company
				) {
					console.log('jobContactItem: ' + jobContactItem.companyName);
					console.log('jobItem: ' + jobItem.company);

					jobItem['company'] = jobContactItem.companyName;
					const resp = await utils.updateJob(jobItem._id, jobItem);
					console.log(resp);
				}
			}
		}
		console.log(tempJobsData);
	};
	const onGridReady = async (params) => {
		const tempJobsData = await getJobs();
		const tempIndustries = await getIndustries();
		const tempJobContacts = await getJobContacts();

		setJobContacts(tempJobContacts);
		setIndustries(tempIndustries);

		await matchCompanyFields(tempJobsData, tempJobContacts); //checking id there is a diffrence between jobcontact.companyName vs job.company, if there is then updateing job.company

		setGridApi(params.api);
		setGridColumnApi(params.columnApi);
	};

	const onFirstDataRendered = (params) => {};

	const handleDelete = async (id) => {
		const confirm = window.confirm('האם למחוק את הרשומה ?', id);
		console.log(id);
		if (confirm) {
			let resp = await utils.deleteJob(id);
			console.log(resp.data);
			getJobs();
		}
	};

	const handleUpdate = async (rowData) => {
		setFormData(rowData);
		setOpen(true);
		try {
			const tempCompanyData = await getCompanyDataById(rowData.jobContactId);
			console.log(tempCompanyData);
			setPoc(tempCompanyData.poc);
			setPocEmail(tempCompanyData.pocEmail);
			setPocPhone(tempCompanyData.pocPhone);
		} catch {
			console.log('there is no jobContactId');
		}
	};

	const onExportClick = () => {
		console.log(gridApi);
		gridApi.exportDataAsCsv({ onlySelected: true });
	};
	const addJob = () => {
		alert('add');
	};

	const transferContacts = async () => {
		const resp = await utils.getAllJobs();
		const allJobs = resp.data;
		console.log(allJobs);
		for await (const x of allJobs) {
			let obj = {
				companyName: x.company,
				poc: x.poc,
				pocEmail: x.pocEmail,
				pocPhone: x.pocPhone,
			};
			console.log(x.company);
			console.log(x.poc);
			console.log(x.pocEmail);
			console.log(x.pocPhone);
			const resp2 = await utilsJobContacts.addJobContact(obj);
			console.log(resp2.data);
		}

		const resp3 = await utilsJobContacts.getAllJobContacts();
		console.log(resp3.data);
	};
	return (
		<div>
			<div className={classes.root}>
				<Box mb={1}>
					<Grid
						container
						spacing={2}
						justifycontent="flex-start"
						alignItems="center"
					>
						<Grid item>
							<Zoom in={true} style={{ transitionDelay: true ? '0ms' : '0ms' }}>
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
								style={{ transitionDelay: true ? '100ms' : '0ms' }}
							>
								<Paper elevation={0} className={classes.paper}>
									<Tooltip title="הוסף משרה">
										<PlusIcon
											fill={theme.palette.secondary.main}
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
								style={{ transitionDelay: true ? '200ms' : '0ms' }}
							>
								<Paper elevation={0} className={classes.paper}>
									<Tooltip title="יצא משרות לקובץ אקסל">
										<CsvIcon
											onClick={() => onExportClick()}
											fill={theme.palette.secondary.main}
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

			<AddAndUpdateJobDialog
				open={open}
				handleClose={handleClose}
				data={formData}
				onChange={onChange}
				handleFormSubmit={handleFormSubmit}
				industries={industries}
				jobContacts={jobContacts}
				getJobContactById={getJobContactById}
				poc={poc}
				pocEmail={pocEmail}
				pocPhone={pocPhone}
				companyName={companyName}
			/>
			<Zoom in={true} style={{ transitionDelay: true ? '300ms' : '0ms' }}>
				<div className="ag-theme-balham" style={{ height: 400 }}>
					<AgGridReact
						defaultColDef={{
							sortable: true,
							filter: true,
							resizable: true,
							floatingFilter: true,
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
			<br />

			<JobsContactsTableComp
				setIsJobContactsChanged={setIsJobContactsChanged}
			/>
		</div>
	);
}
