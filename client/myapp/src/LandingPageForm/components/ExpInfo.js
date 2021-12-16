import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/chip';
import { Box } from '@material-ui/core';
import MultipleSelectComp from './MultipleSelect';
import SingleSelectComp from './SingleSelect';
import { useSelector } from 'react-redux';
import industryUtils from '../../utils/industriesUtils/utils';
import TagsComp from './Tags';
import SingleOptionComp from './SingleOption';
import { useDispatch } from 'react-redux';

export default function ExpinfoForm() {
	const storeData = useSelector((state) => state);
	const [industryData, setIndustryData] = useState({});
	const dispatch = useDispatch();

	useEffect(async () => {
		try {
			const resp = await industryUtils.getIndustry(
				storeData.jobData.industryName
			);
			setIndustryData(resp.data);

			if (!resp.data) {
				const resp2 = await industryUtils.getIndustry('accounting');
				setIndustryData(resp2.data);
			}
		} catch (error) {
			console.log('error geting industries');
		}
	}, []);

	const getValues = (label, values) => {
		dispatch({
			type: 'SETCANDIDATE',
			payload: { [label]: values },
		});
	};

	const getValue = (label, value) => {
		dispatch({
			type: 'SETCANDIDATE',
			payload: { [label]: value },
		});
	};

	return (
		<React.Fragment>
			<Box pt={'1rem'}>
				<Typography variant="subtitle1" color="primary" gutterBottom>
					השדות שלהלן כוללים מידע שנועד לסייע לנו לבצע את ההתאמה המיטבית עבורכם.
					<br />
				</Typography>
				<Typography variant="h6"> קצת על עצמי:</Typography>
				<Box align="right">
					<TagsComp
						label="לימודים ותעודות"
						data={industryData?.certificates}
						name="certificates"
						getValues={getValues}
						storedValues={storeData.candidateData?.certificates}
					/>
				</Box>
				<Box align="right">
					<SingleOptionComp
						label="שנות ניסיון"
						data={industryData.experienceYears}
						name="experienceYears"
						getValue={getValue}
						storedValue={storeData.candidateData?.experienceYears}
					/>
				</Box>
				<Box align="right">
					<TagsComp
						label="תפקידים קודמים"
						data={industryData.pastRoles}
						name="pastRoles"
						getValues={getValues}
						storedValues={storeData.candidateData?.pastRoles}
					/>
				</Box>
				<Box align="right">
					<TagsComp
						label="תחומי פעילות קודמים וגודל חברות"
						data={industryData.pastFieldOfActivity}
						name="pastFieldOfActivity"
						getValues={getValues}
						storedValues={storeData.candidateData?.pastFieldOfActivity}
					/>
				</Box>
			</Box>
			<Box pt={'1rem'}>
				<Typography variant="h6">העדפות אישיות: </Typography>
				<Box align="right">
					<TagsComp
						label="משרות מבוקשות"
						data={industryData.wantedJobs}
						name="wantedJobs"
						getValues={getValues}
						storedValues={storeData.candidateData?.wantedJobs}
					/>
				</Box>
				<Box align="right">
					<SingleOptionComp
						label="ציפיות שכר"
						data={industryData.salaryExpectations}
						name="salaryExpectations"
						getValue={getValue}
						storedValue={storeData.candidateData?.salaryExpectations}
					/>
				</Box>
				<Box align="right">
					<TagsComp
						label="איזורים מועדפים"
						data={industryData.requiredJobAreas}
						name="requiredJobAreas"
						getValues={getValues}
						storedValues={storeData.candidateData?.requiredJobAreas}
					/>
				</Box>
				<Box align="right">
					<TagsComp
						label="היקף משרה"
						data={industryData.requiredJobScale}
						name="requiredJobScale"
						getValues={getValues}
						storedValues={storeData.candidateData?.requiredJobScale}
					/>
				</Box>
			</Box>
		</React.Fragment>
	);
}
