import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createMuiTheme } from '@material-ui/core/styles';
import { StylesProvider, ThemeProvider, jssPreset } from '@material-ui/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { BrowserRouter } from 'react-router-dom';
import landingPageReducer from './LandingPageForm/landingPageReducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
const landingStore = createStore(landingPageReducer);

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createMuiTheme({
	direction: 'rtl', // Both here and <body dir="rtl">
	typography: {
		fontFamily: 'Rubik',
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 800,
	},
	palette: {
		// primary: {
		// 	main: '#6F9483',
		// },
		// secondary: {
		// 	main: '#D88AE5',
		// },
		// error: {
		// 	main: '#D9CE2B',
		// },
		// warning: {
		// 	main: '#FDF6FF',
		// },
		// info: {
		// 	main: '#9B7E7E',
		// },
		// success: {
		// 	main: '#9B7E7E',
		// },
	},
});

ReactDOM.render(
	<BrowserRouter>
		<Provider store={landingStore}>
			<StylesProvider jss={jss}>
				<ThemeProvider theme={theme}>
					<App />
				</ThemeProvider>
			</StylesProvider>
		</Provider>
	</BrowserRouter>,

	document.getElementById('root')
);

reportWebVitals();
