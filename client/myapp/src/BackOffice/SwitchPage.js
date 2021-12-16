import CandidatesTableComp from './CandidatesTable';
import JobsTableComp from './JobsTable';
import axios from 'axios';

import {
	Link,
	Route,
	Router,
	Switch,
	useParams,
	useRouteMatch,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import MainLandingPage from '../LandingPageForm/MainLandingPage';
import LoginComp from './Login';
import UsersTableComp from './UsersTable';
import { useHistory } from 'react-router-dom';
import authService from '../authService';
import ScheduleComp from './Schedule';
export default function SwichPageComp(props) {
	const [role, setRole] = useState();
	let history = useHistory();
	let { path, url } = useRouteMatch();

	useEffect(async () => {
		try {
			const resp = await authService.getRole();
			console.log(resp.data.userRole);
			setRole(resp.data.userRole);
		} catch (err) {
			console.log(err.response.data.auth || err.response.data.role == 'none');
			if (!err.response.data.auth || err.response.data.role == 'none') {
				history.push('/login');
			}
		}
	}, []);
	return (
		<div>
			<Switch>
				{['Admin', 'BD'].includes(role) && (
					<Route path={`${path}/candidates`}>
						<CandidatesTableComp />
					</Route>
				)}
				{['Admin', 'BD'].includes(role) && (
					<Route path={`${path}/jobs`}>
						<JobsTableComp />
					</Route>
				)}

				{['Admin'].includes(role) && (
					<Route path={`${path}/users`}>
						<UsersTableComp />
					</Route>
				)}

				{['Admin'].includes(role) && (
					<Route path={`${path}/schedule`}>
						<ScheduleComp />
					</Route>
				)}
		
			</Switch>

		</div>
	);
}
