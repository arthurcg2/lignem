import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { ThemeProvider } from './states/ThemeState';

import lightTheme from './themes/default';
import darkTheme from './themes/dark';
import tomatoTheme from './themes/tomato';
import blueTheme from './themes/blueTheme';
import redTheme from './themes/redTheme';

import App from './App';

export default function Index() {
	const initialState = { theme: lightTheme };

	async function updateStorage(theme) {
		try {
			await AsyncStorage.setItem('theme', theme);
		} catch (err) {
			console.error('Erro ao salvar tema: ' + err);
		}
	}

	const reducer = (state, action) => {
		const type = action.type.substr(6, action.type.lastIndexOf('Mode') - 6);
		updateStorage(type);

		switch (action.type) {
			case 'enableDarkMode':
				return {
					...state,
					theme: darkTheme,
				};
			case 'enableLightMode':
				return {
					...state,
					theme: lightTheme,
				};
			case 'enableTritanopiaMode':
			case 'enableTritanomalyMode':
				return {
					...state,
					theme: tomatoTheme,
				};
			case 'enableProtanopiaMode':
			case 'enableProtanomalyMode':
				return {
					...state,
					theme: blueTheme,
				};
			case 'enableDeuteranopiaMode':
			case 'enableDeuteranomalyMode':
				return {
					...state,
					theme: redTheme,
				};
			default:
				updateStorage('light');
				console.err(`Color mode '${type}' not found.`);

				return {
					...state,
					theme: lightTheme,
				};
		}
	};

	return (
		<ThemeProvider initialState={initialState} reducer={reducer}>
			<App />
		</ThemeProvider>
	);
}
