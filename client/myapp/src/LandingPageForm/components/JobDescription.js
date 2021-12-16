import { Box, Container, Icon, Typography } from '@material-ui/core';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import BusinessIcon from '@material-ui/icons/Business';
import WorkIcon from '@material-ui/icons/Work';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import { useEffect, useState } from 'react';
import jobUtils from '../../utils/jobsUtils/utils';
import { useSelector } from 'react-redux';
function JobDescriprionComp(props) {
	const storeData = useSelector((state) => state);

	useEffect(async () => {}, []);

	return (
		<div>
			<Container maxWidth="sm">
				<Box component="span" m={1}>
					<Box component="span">
						<Typography variant="h6" gutterBottom>
							מס' משרה : {storeData.jobData.jobNumber}
						</Typography>
						<Typography color="secondary" variant="h6" gutterBottom>
							{storeData.jobData.companyToPublish}
						</Typography>
						<br />
					</Box>
					<Box component="span">
						<Typography variant="h5" gutterBottom>
							<BusinessIcon
								color="secondary"
								style={{ position: 'relative', top: '3px', marginLeft: '10px' }}
							/>
							תיאור החברה:
						</Typography>
					</Box>
					<Typography
						variant="body1"
						gutterBottom
						style={{ whiteSpace: 'pre-line' }}
					>
						{storeData.jobData?.companyDescription}
					</Typography>
				</Box>
				<Box component="span" m={1}>
					<Box component="span">
						<Typography variant="h5" gutterBottom>
							<PermContactCalendarIcon
								color="secondary"
								style={{ position: 'relative', top: '3px', marginLeft: '10px' }}
							/>
							תיאור התפקיד:
						</Typography>
					</Box>
					<Typography
						variant="body1"
						gutterBottom
						style={{ whiteSpace: 'pre-line' }}
					>
						{storeData.jobData?.jobDescriprion}
					</Typography>
				</Box>
				<Box component="span" m={1}>
					<Box component="span">
						<Typography variant="h5" gutterBottom>
							<WorkIcon
								color="secondary"
								style={{ position: 'relative', top: '3px', marginLeft: '10px' }}
							/>
							דרישות תפקיד:
						</Typography>
					</Box>
					<Typography
						variant="body1"
						gutterBottom
						style={{ whiteSpace: 'pre-line' }}
					>
						{storeData.jobData?.jobRequirements}
					</Typography>
				</Box>
			</Container>
		</div>
	);
}

export default JobDescriprionComp;
