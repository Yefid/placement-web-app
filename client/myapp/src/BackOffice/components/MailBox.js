import React, { useState, useEffect } from 'react';
import MailBoxItem from './MailBoxItem';
import { Button, Grid, List } from '@material-ui/core';
import mailUtils from '../../utils/candidatesUtils/mailHandlerUtils';
import jobsUtils from '../../utils/jobsUtils/utils';
import { makeStyles } from '@material-ui/core/styles';
import candidatesUtils from '../../utils/candidatesUtils/utils';
import { useContext } from 'react';
import Zoom from '@material-ui/core/Zoom';
import CircularProgress from '@material-ui/core/CircularProgress';

import { CandidateTableContext } from '../candidateTableContext';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		flexGrow: 1,
		paddingBottom: '0px',
	},

	paper: {
		backgroundColor: 'transparent',

		padding: theme.spacing(1),
		color: theme.palette.text.secondary,
	},

	listWrap: {
		borderBottom: '1px solid #bbbfbe',
		color: 'black',
	},
}));

export default function MailBox(props) {
	const classes = useStyles();
	const [candidateTable, setCandidateTable] = useContext(CandidateTableContext);

	const [messagesData, setMessagesData] = useState([]);
	const [isLoading, setIsloading] = useState(false);

	const [jobNumberAndDescriptionList, setJobNumberAndDescriptionList] =
		useState([]);

	const getAttachment = async () => {
		const resp = await mailUtils.getAttachments();
		console.log(resp.data.response);

		addCheckedAttrToMessages(resp.data.response);
	};

	const addCheckedAttrToMessages = (data) => {
		let tempList = [];

		data.forEach((candidateData, index) => {
			candidateData.isChecked = false;
			tempList.push(candidateData);
		});
		console.log(tempList);
		setMessagesData(tempList);
	};

	useEffect(async () => {
		console.log(candidateTable);
		getJobList();
	}, []);

	useEffect(async () => {
		setIsloading(true);
		if (props.isGettingCvFromMail) {
			await getAttachment();
		}
		setIsloading(false);
	}, [props.isGettingCvFromMail]);

	const getJobList = async () => {
		const resp = await jobsUtils.getJobList();
		const jobList = resp.data;
		console.log(resp.data);
		let jobNumberAndDescriptionList = [];
		jobList.map((x) => {
			let item = x.jobNumber + ': ' + x.companyDescription;
			jobNumberAndDescriptionList.push(item);
		});

		setJobNumberAndDescriptionList(jobNumberAndDescriptionList);
	};

	const getValue = (label, value, index) => {
		let jobNumber = '';
		if (value) {
			console.log(index);
			console.log(label, value);
			const indexOfEndOfJobNumber = value?.indexOf(':');
			console.log(indexOfEndOfJobNumber);
			jobNumber = value.slice(0, indexOfEndOfJobNumber);
			console.log(jobNumber);
		}

		let allItemsData = [...messagesData];
		allItemsData[index] = {
			...allItemsData[index],
			job: value,
			jobNumber: jobNumber,
		};

		setMessagesData(allItemsData);
		console.log(allItemsData);
	};

	const setSubject = (value, index) => {
		console.log(value, index);
		let allItemsData = [...messagesData];
		allItemsData[index] = {
			...allItemsData[index],
			subject: value,
		};

		setMessagesData(allItemsData);
		console.log(allItemsData);
	};

	const setFileName = (value, index) => {
		console.log(value, index);
		let allItemsData = [...messagesData];
		allItemsData[index] = {
			...allItemsData[index],
			filename: value,
		};

		setMessagesData(allItemsData);
		console.log(allItemsData);
	};

	const setMailBody = (value, index) => {
		console.log(value, index);
		let allItemsData = [...messagesData];
		allItemsData[index] = {
			...allItemsData[index],
			mailBody: value,
		};

		setMessagesData(allItemsData);
		console.log(allItemsData);
	};

	const checkBoxSelection = (value, index, isChecked) => {
		let tempCandidateData = messagesData[index];

		tempCandidateData.isChecked = isChecked;
		let tempMessages = [...messagesData];
		tempMessages[index].isChecked = isChecked;

		setMessagesData([...tempMessages]);
	};

	const sendForm = async () => {
		//sending data to server then in the server side this data will shape and parse
		console.log(messagesData);
		let checkedMessagesData = [];
		messagesData.forEach((x) => {
			if (x.isChecked) {
				checkedMessagesData.push(x);
			}
		});

		console.log(checkedMessagesData);

		if (checkedMessagesData[0]) {
			await candidatesUtils.addCandidateFromMail(checkedMessagesData);
			//refresh table
			props.UpdateCandidatesTable(); //refresh candidates table
			await getAttachment(); //refresh mail
		} else {
			alert('נא לסמן נתונים');
		}
	};

	return (
		<div>
			<Grid container spacing={2} justify="center" alignItems="center">
				{!isLoading && (
					<Zoom in={true} style={{ transitionDelay: true ? '0ms' : '0ms' }}>
						<Grid item>
							<Button variant="contained" color="primary" onClick={sendForm}>
								{' '}
								העבר לטבלת המועמדים{' '}
							</Button>{' '}
						</Grid>
					</Zoom>
				)}
				<Grid item>{isLoading && <CircularProgress />}</Grid>
			</Grid>

			<List className={classes.root}>
				{messagesData?.map((value, index) => {
					const labelId = `checkbox-list-label-${value}`;
					return (
						<MailBoxItem
							value={value}
							index={index}
							key={index}
							labelId={labelId}
							messagesData={messagesData}
							jobNumberAndDescriptionList={jobNumberAndDescriptionList}
							getValue={getValue}
							setSubject={setSubject}
							setFileName={setFileName}
							setMailBody={setMailBody}
							checkBoxSelection={checkBoxSelection}
						/>
					);
				})}
			</List>
		</div>
	);
}
