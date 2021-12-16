import './App.css';
import MainComp from './BackOffice/Main';
import MainSwitch from './MainSwitch';
import { useEffect } from 'react';
import ReactGA from 'react-ga';

function App() {
	useEffect(() => {
		ReactGA.initialize('UA-209408757-2'); //G-81BG4BFY8B
		ReactGA.pageview(window.location.pathname + window.location.search);
	}, []);
	return (
		<div className="App">
			<MainSwitch />
		</div>
	);
}

export default App;
