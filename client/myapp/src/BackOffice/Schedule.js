import React, { useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
//import 'ag-grid-enterprise';
//import '@ag-grid-community/csv-export';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './Ag-grid-custom.css';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Button } from '@material-ui/core';
import utils from '../utils/schedulesUtils/utils';
import utilsCandidates from '../utils/candidatesUtils/utils';
import utilsJobs from '../utils/jobsUtils/utils';

import {
	isIsoDate,
	parseISOString,
	LocalDateStringToUTCDate,
} from '../helpers/datetimeHandle';
import AddAndUpdateScheduleDialog from './components/AddAndUpdateScheduleDialog';

export default function ScheduleComp() {
	const initialFormValue = {
		_id: '',
		creationDate: '',
		dateTime: '',
		candidateName: '',
		candidateId: '',
		jobDescriprion: '',
		jobId: '',
		status: '',
	};

	// set to default data
	const [gridColumnApi, setGridColumnApi] = useState(null);

	const [gridApi, setGridApi] = useState(null);
	const [rowData, setRowData] = useState();
	const [candidatesData, setCandidatesData] = useState([]);
	const [jobsData, setJobsData] = useState([]);

	const [colDefs, setColDefs] = useState([
		{
			field: '_id',
			headerName: '',
			cellRendererFramework: (params) => (
				<div>
					<Button
						onClick={() => handleUpdate(params.data)}
						style={{ height: '20px' }}
						size="small"
						variant="outlined"
					>
						ערוך
					</Button>
				</div>
			),
			editable: false,
		},

		{ field: '_id', headerName: 'מס מזהה' },
		{ field: 'creationDate', headerName: 'תאריך יצירה' },
		{ field: 'dateTime', headerName: 'מועד פגישה' },
		{ field: 'candidateName', headerName: 'שם מועמד' },
		{ field: 'candidateId', headerName: 'מס מועמד' },
		{ field: 'jobDescriprion', headerName: 'שם משרה' },
		{ field: 'jobId', headerName: 'מס משרה' },
		{ field: 'status', headerName: 'סטטוס' },

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
		},
	]);
	const [open, setOpen] = React.useState(false); //false
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

	const getCandidates = async () => {
		const resp = await utilsCandidates.getAllCandidates();
		console.log(resp.data);
		setCandidatesData(resp.data);
	};

	const getJobs = async () => {
		const resp = await utilsJobs.getAllJobs();
		console.log(resp.data);
		setJobsData(resp.data);
	};

	const handleClickOpen = () => {
		setOpen(true);
		getCandidates();
		getJobs();
	};

	const handleClose = () => {
		setOpen(false);
		setFormData(initialFormValue);
	};

	const rowDataModification = async (data) => {
		let modifiedData = [];
		data.forEach((x) => {
			let tempObj = {};
			Object.keys(x).map(function (key, index) {
				tempObj[key] = Array.isArray(x[key]) ? x[key].join() : x[key];
				tempObj[key] = isIsoDate(x[key]) ? parseISOString(x[key]) : x[key];
			});
			modifiedData.push(tempObj);
		});
		setRowData(modifiedData);
	};

	const getSchedules = async () => {
		const resp = await utils.getAllSchedules();
		console.log(resp);
		rowDataModification(resp.data); //-----------------------------------

		const init = [
			{
				id: '1',
				creationDate: '2011-11-06T14:15:00.000Z',
				dateTime: '2021-03-01T14:15:00.000Z',
				candidateId: 'ca1',
				jobId: 'jo1',
				status: 'open',
			},
			{
				id: '2',
				creationDate: '2012-11-06T14:30:00.000Z',
				dateTime: '2022-03-01T14:30:00.000Z',
				candidateId: 'ca2',
				jobId: 'jo2',
				status: 'open',
			},
		];
	};

	const getTextFieldNameFromComboBox = (textFieldName) => {
		const data = textFieldName.split('-');
		return data[0];
	};

	const onChange = (e, newValue) => {
		const { value, id } = e.target;
		console.log(value, id);
		console.log([id]);
		console.log(newValue);
		const comboBoxName = getTextFieldNameFromComboBox(id);
		if (id == 'dateTime')
			setFormData({ ...formData, [id]: LocalDateStringToUTCDate(value) });
		else if (comboBoxName == 'candidateName') {
			console.log(newValue.name);
			console.log(comboBoxName);
			setFormData({
				...formData,
				['candidateId']: newValue._id,
				[comboBoxName]: newValue.name,
			});
		} else if (comboBoxName == 'jobDescriprion') {
			console.log(newValue.jobDescriprion);
			console.log(newValue._id);
			setFormData({
				...formData,
				['jobId']: newValue._id,
				[comboBoxName]: newValue.jobDescriprion,
			});
			console.log(formData);
		} else setFormData({ ...formData, [id]: value });
	};

	const handleFormSubmit = async () => {
		if (formData._id) {
			const resp = await utils.updateSchedule(formData._id, formData);
			console.log(resp.data);
			handleClose();
			getSchedules();
		} else {
			const resp = await utils.addSchedule(formData);
			console.log(resp.data);
			handleClose();
			getSchedules();
		}
	};

	const onGridReady = async (params) => {
		await getSchedules();
		setGridApi(params.api);
		setGridColumnApi(params.columnApi);
	};

	const onFirstDataRendered = (params) => {
		autoSizeAll(false);
	};

	const handleDelete = async (id) => {
		const confirm = window.confirm('האם למחוק את הרשומה ?', id);
		console.log(id);
		if (confirm) {
			let resp = await utils.deleteSchedule(id);
			console.log(resp.data);
			getSchedules();
		}
	};

	const handleUpdate = (oldData) => {
		setFormData(oldData);
		console.log(oldData);
		handleClickOpen(true);
	};

	const onExportClick = () => {
		console.log(gridApi);
		gridApi.exportDataAsCsv({ onlySelected: true });
	};

	return (
		<div>
			<Typography variant="h3" gutterBottom>
				<Box fontWeight="fontWeightMedium" m={1}>
					ניהול לו"ז{' '}
				</Box>
			</Typography>
			<button onClick={handleClickOpen}> הוסף חלון זמן</button>
			<button onClick={() => onExportClick()}> ייצא שורות נבחרות </button>

			<AddAndUpdateScheduleDialog
				open={open}
				handleClose={handleClose}
				data={formData}
				onChange={onChange}
				handleFormSubmit={handleFormSubmit}
				candidatesData={candidatesData}
				jobsData={jobsData}
			/>

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
		</div>
	);
}
