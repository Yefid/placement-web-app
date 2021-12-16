import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './Ag-grid-custom.css';
import './style.css';
import Zoom from '@material-ui/core/Zoom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SendMailDialog from './components/SendMailDialog';
import { ButtonGroup, Grid, TextField } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Button } from '@material-ui/core';
import AddAndUpdateCandidateDialog from './components/AddAndUpdateCandidateDialog';
import utils from '../utils/candidatesUtils/utils';
import utilsUpload from '../utils/uploadUtils/utils';
import industryUtils from '../utils/industriesUtils/utils';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import { ReactComponent as PlusIcon } from '../img/plusIcon.svg';
import { ReactComponent as CsvIcon } from '../img/csv.svg';
import { ReactComponent as Loadalldata } from '../img/loadalldata.svg';
import { ReactComponent as GetCVFromMailIcon } from '../img/getCVFromMailIcon.svg';
import MenuPopup from './components/MenuPopup';
import { CandidateTableContextProvider } from './candidateTableContext';
import {
	LocalDateStringToUTCDate,
	getDateFromIso,
} from '../helpers/datetimeHandle';
import ReceiptIcon from '@material-ui/icons/Receipt';
import EditIcon from '@material-ui/icons/Edit';
import utilsDownload from '../utils/downloadUtils/utils';
import path from 'path';
import MailBox from './components/MailBox';
import Paper from '@material-ui/core/Paper';
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
	quickSearchInput: {
		width: '170px',
	},
	partOne: {
		background: 'linear-gradient(#FFFFFF,#f8f9fa)',
		paddingBottom: theme.spacing(6),
		paddingRight: theme.spacing(6),
		paddingLeft: theme.spacing(6),
		[theme.breakpoints.down('sm')]: {
			paddingBottom: theme.spacing(0),
			paddingRight: theme.spacing(0),
			paddingLeft: theme.spacing(0),
		},
	},
	partTwo: {
		background: 'linear-gradient(#FFFFFF,#f8f9fa)',
		paddingBottom: theme.spacing(6),
		paddingRight: theme.spacing(6),
		paddingLeft: theme.spacing(6),
		[theme.breakpoints.down('sm')]: {
			paddingBottom: theme.spacing(0),
			paddingRight: theme.spacing(0),
			paddingLeft: theme.spacing(0),
		},
	},
	activeButton: {
		backgroundColor: theme.palette.primary.light + ' !important',
	},
	buttonGroup: {
		paddingTop: '10px',

		paddingBottom: '10px',
	},
}));

export default function CandidatesTableComp() {
	const classes = useStyles();
	const theme = useTheme();

	const initialFormValue = {
		name: '',
		email: '',
		idNumber: '',
		phone: '',
		offers: false,
		gender: '',
		birthDate: '1900-01-01',
		wantedJobs: [],
		certificates: [],
		experienceYears: '',
		requiredJobScale: [],
		requiredJobAreas: [],
		pastRoles: [],
		pastFieldOfActivity: [],
		salaryExpectations: '',
		freeText: '',
		cv: '',
		fromWhere: [],
		insight: '',
		driveId: '',
		cvContent: '',
		status: [],
	};
	// set to default data
	const [gridColumnApi, setGridColumnApi] = useState(null);

	const [gridApi, setGridApi] = useState(null);
	const [rowData, setRowData] = useState();
	const [isUploading, setIsUploading] = useState(false);
	const [spin, setSpin] = useState(false);
	const [openSnackBar, setOpenSnackBar] = useState(false);
	const [isMailerVisible, setIsMailerVisible] = useState(false);
	const [isGettingCvFromMail, setIsGettingCvFromMail] = useState(false);

	const [isGetCandidatesCalled, setIsGetCandidatesCalled] = useState(false);
	const [filterByStatus, setFilterByStatus] = useState('הכל');
	const [colDefs, setColDefs] = useState([
		{
			headerName: '',
			field: '_id',
			maxWidth: 30,
			headerCheckboxSelection: true,
			headerCheckboxSelectionFilteredOnly: true,
			checkboxSelection: true,
		},
		{
			field: '_id',
			headerName: '',

			cellRendererFramework: (params) => (
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
						<MenuPopup
							handleUpdate={() => handleUpdate(params.data)}
							showCV={() => showCV(params.data.driveId)}
							handleDelete={() => handleDelete(params.value)}
							addStatus={(status) => addStatus(params.data, status)}
							user={'unknone'}
							params={params.data}
							isMailerVisible={isMailerVisible}
							setIsMailerVisible={setIsMailerVisible}
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
						{params.data.driveId && (
							<ReceiptIcon
								className="fa fa-plus-circle"
								color="secondary"
								fontSize="small"
								onClick={() => showCV(params.data.driveId)}
								style={{ cursor: 'pointer' }}
							/>
						)}
					</Grid>
				</Grid>
			),
			editable: false,
			width: 135,
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
			width: 150,
		},

		{
			field: 'status',
			headerName: 'סטטוס',
			width: 150,
			cellRendererFramework: (params) => (
				<Grid
					style={{
						display: 'flex',
					}}
				>
					<Grid style={{}}>
						{params.data.status.map((x, index) => {
							switch (x) {
								case 'לדבר':
									return (
										<Chip
											color="primary"
											variant="outlined"
											size="small"
											label={x}
											key={index}
										/>
									);

								default:
									return (
										<Chip
											key={index}
											variant="outlined"
											size="small"
											label={x}
										/>
									);
							}
						})}
					</Grid>
				</Grid>
			),
			editable: false,
			width: 100,
		},
		{ field: 'name', headerName: 'שם', tooltipField: 'name', width: 150 },

		{ field: 'email', headerName: 'Email', width: 150 },

		{ field: 'phone', headerName: 'טלפון', width: 100 },
		{
			field: 'birthDate',
			headerName: 'גיל',

			cellRendererFramework: (params) => (
				<Grid
					style={{
						display: 'flex',
					}}
				>
					{new Date().getFullYear() - params.data.birthDate.slice(0, 4)}
				</Grid>
			),
			editable: false,
			width: 80,
		},
		{
			field: 'experienceYears',
			headerName: 'שנות ניסיון',
			tooltipField: 'experienceYears',
			width: 100,
		},

		{
			field: 'certificates',
			headerName: 'לימודים ותעודות',
			tooltipField: 'certificates',
			width: 200,
		},
		{
			field: 'pastRoles',
			headerName: 'תפקידים קודמים',
			tooltipField: 'pastRoles',
			width: 200,
		},
		{
			field: 'pastFieldOfActivity',
			headerName: 'תחומי פעילות קודמים',
			tooltipField: 'pastFieldOfActivity',
			width: 200,
		},

		{
			field: 'requiredJobAreas',
			headerName: 'אזורים מועדפים',
			tooltipField: 'requiredJobAreas',
			width: 200,
		},
		{ field: 'offers', headerName: 'הצעות נוספות?', width: 100 },
		{ field: 'fromWhere', headerName: 'מהיכן הגיע?', width: 100 },
		{
			field: 'insight',
			headerName: 'חוות דעתנו',
			tooltipField: 'insight',
			width: 200,
		},

		{ field: 'wantedJobs', headerName: 'משרות מבוקשות' },
		{
			field: 'requiredJobScale',
			headerName: 'היקף משרה',
			tooltipField: 'requiredJobScale',
			width: 200,
		},

		{ field: 'salaryExpectations', headerName: 'ציפיות שכר', width: 100 },
		{
			field: 'freeText',
			headerName: 'מלל חופשי',
			tooltipField: 'freeText',
			width: 200,
		},
		{ field: 'cv', headerName: 'קו"ח' },

		{ field: 'cvContent', headerName: 'מלל קורות חיים' },
		{ field: 'birthDate', headerName: 'תאריך לידה' },
		{ field: 'idNumber', headerName: 'ת.ז.' },
		{ field: 'gender', headerName: 'מגדר' },
	]);
	const [open, setOpen] = React.useState(false);
	const [formData, setFormData] = useState(initialFormValue);
	const [cvOpen, setCvOpen] = useState(false);
	const [cvContent, setCvContent] = useState('');
	const [blob, setBlob] = useState({});
	const [industryData, setIndustryData] = useState({});

	// load the data after the grid has been setup
	//[] means on first render so no need to memo the results at this point
	React.useEffect(async () => {
		const resp = await industryUtils.getIndustry('accounting');
		setIndustryData(resp.data);
	}, []);

	const UpdateCandidatesTable = async () => {
		await getLimitedCandidates();
		alert('המועמדים התווספו לטבלה');
	};

	const sendCV = async (event) => {
		const fullname = formData.name;
		const data2 = new FormData();
		const ext = path.extname(event.target.files[0].name);
		const name = fullname + '-CV-' + Date.now() + ext;
		data2.append('name', name);
		data2.append('file', event.target.files[0]);
		setIsUploading(true); //in order to disable sending form while the file is uploading

		await utilsUpload
			.uploadFile(data2)
			.then((res) => {
				console.log('created with drive id of: ' + res.data.id);
				console.log('content: ' + res.data.content);
				setFormData({
					...formData,
					cv: name,
					driveId: res.data.id,
					cvContent: res.data.content,
				});

				setIsUploading(false);
			})
			.catch((err) => console.log(err));
		console.log(formData);
	};
	const downloadCV = (id) => {
		console.log(id);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setFormData(initialFormValue);
	};

	//true if isoDateString
	function isIsoDate(str) {
		if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
		var d = new Date(str);
		return d.toISOString() === str;
	}
	//Convert isoDateString to local timezone and format
	function parseISOString(s) {
		var b = s.split(/\D+/);
		return new Date(
			Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6])
		).toLocaleString('en-GB', {
			timeZone: 'Asia/Jerusalem',
		});
	}

	const rowDataModification = async (data) => {
		let modifiedData = [];
		data.forEach((x) => {
			let tempObj = {};

			Object.keys(x).map(function (key, index) {
				if (isIsoDate(x[key]) && key != 'birthDate') {
					tempObj[key] = x[key];
					tempObj[key + '1'] = parseISOString(x[key]); //there is a bug converting to local time creationDate1
				} else if (key == 'birthDate') {
					tempObj[key] = getDateFromIso(x[key]);
				} else {
					tempObj[key] = x[key];
				}
			});
			modifiedData.push(tempObj);
		});
		setRowData(modifiedData);
	};
	const rowDataReverseModification = async (data) => {
		let tempObj = {};
		Object.keys(data).map(function (key, index) {
			tempObj[key] = data[key];
			// }
		});

		return tempObj;
	};
	const getCandidates = async () => {
		if (!isGetCandidatesCalled) {
			setSpin(true);
			const resp = await utils.getAllCandidates();
			rowDataModification(resp.data);
			console.log('all data has been loaded');
			setSpin(false);
			setOpenSnackBar(true);
			setIsGetCandidatesCalled(true);
		}
	};

	const getLimitedCandidates = async () => {
		const resp = await utils.getLimitedCandidates();
		rowDataModification(resp.data);
	};
	const onChange = (e) => {
		const { value, id } = e.target;

		if (id == 'dateTime') {
			setFormData({ ...formData, [id]: LocalDateStringToUTCDate(value) });
		} else if (id == 'offers') {
			setFormData({ ...formData, [id]: e.target.checked });
		} else {
			setFormData({ ...formData, [id]: value });
		}
	};

	const getValues = (label, values) => {
		setFormData({ ...formData, [label]: values });
	};

	function onFilterTextBoxChanged(value) {
		gridApi.setQuickFilter(value);
	}
	const handleFormSubmit = async () => {
		const reversedModifiedData = await rowDataReverseModification(formData);
		if (formData._id) {
			const resp = await utils.updateCandidate(
				formData._id,
				reversedModifiedData
			);
			handleClose();
			getLimitedCandidates();
		} else {
			const resp = await utils.addCandidate(reversedModifiedData);
			handleClose();
			getLimitedCandidates();
		}
	};

	const onGridReady = async (params) => {
		await getLimitedCandidates();
		setGridApi(params.api);
		setGridColumnApi(params.columnApi);
	};

	const onFirstDataRendered = (params) => {};

	const handleDelete = async (id) => {
		const confirm = window.confirm('האם למחוק את הרשומה ?', id);

		if (confirm) {
			let resp = await utils.deleteCandidate(id);
			getLimitedCandidates();
		}
	};

	const handleUpdate = (oldData) => {
		setFormData(oldData);

		handleClickOpen(true);
	};

	const showCV = (driveId) => {
		window.open(
			'https://drive.google.com/file/d/' + driveId + '/view?usp=drivesdk',
			'_blank',
			'location=yes,height=570,width=520,scrollbars=yes,status=yes'
		);
	};

	const addStatus = async (params, status) => {
		console.log(params);
		let newparams = { ...params };
		newparams['status'] = [...newparams.status, status];
		console.log(newparams);

		const reversedModifiedData = await rowDataReverseModification(newparams);
		if (reversedModifiedData._id) {
			const resp = await utils.updateCandidate(
				reversedModifiedData._id,
				reversedModifiedData
			);
		}
		getLimitedCandidates();
	};

	const onExportClick = () => {
		gridApi.exportDataAsCsv({ onlySelected: true });
	};

	const externalFilterChanged = (newValue) => {
		setFilterByStatus(newValue);
		experienceYearsType = newValue;
		gridApi.onFilterChanged();
	};

	const isExternalFilterPresent = () => {
		return experienceYearsType !== 'הכל';
	};

	const doesExternalFilterPass = (node) => {
		setIsGetCandidatesCalled(false);

		if (node.data.status) {
			switch (experienceYearsType) {
				case 'לדבר':
					return node.data.status.includes('לדבר');
				case 'דיברנו':
					return node.data.status.includes('דיברנו');
				case 'להגיש':
					return node.data.status.includes('להגיש');
				case 'הוגש':
					return node.data.status.includes('הוגש');
				case 'להציע משרה אחרת':
					return node.data.status.includes('להציע משרה אחרת');

				default:
					return true;
			}
		}
	};
	function Alert(props) {
		return <MuiAlert elevation={6} variant="filled" {...props} />;
	}

	const handleCloseSnackBar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenSnackBar(false);
	};
	return (
		<div>
			<CandidateTableContextProvider>
				<Box className={classes.partOne} m={0} pt={0}>
					<div className={classes.root}>
						<Grid container spacing={2}>
							<Grid item>
								<Paper elevation={0} className={classes.paper}>
									{' '}
									<Box m={0} pt={0}>
										<TextField
											className={classes.quickSearchInput}
											size="small"
											label="חיפוש מהיר"
											variant="outlined"
											//

											onChange={(e) => onFilterTextBoxChanged(e.target.value)}
											onFocus={getCandidates}
										></TextField>
									</Box>
								</Paper>
							</Grid>

							<Grid item>
								<Zoom in={true}>
									<Paper elevation={0} className={classes.paper}>
										<Tooltip title="הוסף מועמד">
											<PlusIcon
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
									style={{ transitionDelay: true ? '200ms' : '0ms' }}
								>
									<Paper elevation={0} className={classes.paper}>
										<Tooltip title="יצא את המועמדים המסומנים לקובץ אקסל">
											<CsvIcon
												onClick={() => onExportClick()}
												fill={theme.palette.primary.main}
												style={{ cursor: 'pointer' }}
											/>
										</Tooltip>
									</Paper>
								</Zoom>
							</Grid>

							<Grid item>
								<Zoom
									in={true}
									style={{ transitionDelay: true ? '400ms' : '0ms' }}
								>
									<Paper elevation={0} className={classes.paper}>
										<Tooltip title="טען את כל המועמדים">
											<Loadalldata
												onClick={getCandidates}
												fill={theme.palette.primary.main}
												style={{ cursor: 'pointer' }}
												className={spin && 'spin'}
											/>
										</Tooltip>
									</Paper>
								</Zoom>
							</Grid>
							<Grid item>
								<Zoom
									in={true}
									style={{ transitionDelay: true ? '600ms' : '0ms' }}
								>
									<Paper elevation={0} className={classes.paper}>
										<Tooltip title="טען מיילים שלא נקראו המכילים קבצים">
											<GetCVFromMailIcon
												onClick={() => setIsGettingCvFromMail(true)}
												stroke={theme.palette.primary.main}
												style={{ cursor: 'pointer' }}
											/>
										</Tooltip>
									</Paper>
								</Zoom>
							</Grid>

							<Grid item></Grid>
						</Grid>
					</div>
					<Zoom in={true} style={{ transitionDelay: true ? '600ms' : '0ms' }}>
						<ButtonGroup
							className={classes.buttonGroup}
							size="small"
							aria-label="small outlined button group"
						>
							<Button
								className={clsx(
									filterByStatus == 'הכל' && classes.activeButton
								)}
								onClick={() => externalFilterChanged('הכל')}
							>
								הכל
							</Button>
							<Button
								className={clsx(
									filterByStatus == 'לדבר' && classes.activeButton
								)}
								onClick={() => externalFilterChanged('לדבר')}
							>
								לדבר
							</Button>
							<Button
								className={clsx(
									filterByStatus == 'דיברנו' && classes.activeButton
								)}
								onClick={() => externalFilterChanged('דיברנו')}
							>
								דיברנו
							</Button>
							<Button
								className={clsx(
									filterByStatus == 'להגיש' && classes.activeButton
								)}
								onClick={() => externalFilterChanged('להגיש')}
							>
								להגיש
							</Button>
							<Button
								className={clsx(
									filterByStatus == 'הוגש' && classes.activeButton
								)}
								onClick={() => externalFilterChanged('הוגש')}
							>
								הוגש
							</Button>
							<Button
								className={clsx(
									filterByStatus == 'להציע משרה אחרת' && classes.activeButton
								)}
								onClick={() => externalFilterChanged('להציע משרה אחרת')}
							>
								להציע משרה אחרת
							</Button>
						</ButtonGroup>
					</Zoom>

					<AddAndUpdateCandidateDialog
						open={open}
						handleClose={handleClose}
						data={formData}
						onChange={onChange}
						handleFormSubmit={handleFormSubmit}
						downloadCV={downloadCV}
						sendCV={sendCV}
						industryData={industryData}
						getValues={getValues}
						isUploading={isUploading}
					/>
					<Snackbar
						open={openSnackBar}
						autoHideDuration={6000}
						onClose={handleCloseSnackBar}
					>
						<Alert onClose={handleClose} severity="success">
							טבלת המועמדים נטענה בהצלחה!
						</Alert>
					</Snackbar>
					<Grid container spacing={3}>
						<Grid item sm={12} xs={12}>
							<Zoom
								in={true}
								style={{ transitionDelay: true ? '800ms' : '0ms' }}
							>
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
										animateRows={true}
										isExternalFilterPresent={isExternalFilterPresent}
										doesExternalFilterPass={doesExternalFilterPass}
										suppressRowClickSelection={true}
									></AgGridReact>
								</div>
							</Zoom>
						</Grid>
					</Grid>
				</Box>
				<SendMailDialog
					isMailerVisible={isMailerVisible}
					setIsMailerVisible={setIsMailerVisible}
				/>

				<Box className={classes.partTwo} m={0} pt={0}>
					<Grid
						container
						spacing={3}
						justify="center"
						alignItems="center"
						direction="column"
					>
						<Grid item sm={12} xs={12}>
							{isGettingCvFromMail && (
								<Box component="span" mr={1}>
									<MailBox
										isGettingCvFromMail={isGettingCvFromMail}
										setIsGettingCvFromMail={setIsGettingCvFromMail}
										UpdateCandidatesTable={UpdateCandidatesTable}
									/>
								</Box>
							)}
						</Grid>
						<Grid item sm={12} xs={12}></Grid>
					</Grid>
				</Box>
			</CandidateTableContextProvider>
		</div>
	);
	var experienceYearsType = 'everyone';
}
