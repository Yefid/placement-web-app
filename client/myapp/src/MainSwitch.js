import MainComp from './BackOffice/Main';
import MainLandingPage from './LandingPageForm/MainLandingPage';
import MainLandingPageGeneric from './LandingPageForm/MainLandingPageGeneric';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import './styles.css';

import { useEffect } from 'react';
import LoginComp from './BackOffice/Login';

import landingPageReducer from './LandingPageForm/landingPageReducer';
import { createStore } from 'redux';
import MainPage from './mainPage/MainPage';

export default function SwichPageComp(props) {
	let { path, url } = useRouteMatch();

	useEffect(() => {}, []);
	return (
		<div>
			<Switch>
				<Route path={`${path}backoffice`}>
					<MainComp />
				</Route>

				<Route path={`${path}landing/:id`} component={MainLandingPage} />

				<Route path={`${path}landing/`} component={MainLandingPageGeneric} />

				<Route path={`${path}login`}>
					<LoginComp />
				</Route>

				<Route exact path={`${path}`}>
					<MainPage />
				</Route>
			</Switch>

		</div>
	);
}
