import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { ThemeProvider } from './states/ThemeState';

import lightTheme from './themes/default';
import darkTheme from './themes/dark';

import App from './App';

export default function Index() {
	const initialState = { theme: lightTheme };

	async function updateStorage(theme) {
		try {
			await AsyncStorage.setItem('darkmode', theme);
		} catch (err) {
			console.error('Erro ao salvar tema: ' + err);
		}
	}

	const reducer = (state, action) => {
		switch (action.type) {
			case 'enableDarkMode':
				updateStorage('true');
				return {
					...state,
					theme: darkTheme,
				};
			case 'enableLightMode':
				updateStorage('false');
				return {
					...state,
					theme: lightTheme,
				};
			default:
				return state;
		}
	};

	return (
		<ThemeProvider initialState={initialState} reducer={reducer}>
			<App />
		</ThemeProvider>
	);
}
