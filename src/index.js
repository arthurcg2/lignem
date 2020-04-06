import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { ThemeSwitchProvider } from './states/ThemeSwitchContext';

import lightTheme from './themes/default';
import darkTheme from './themes/dark';
import tomatoTheme from './themes/tomato';
import blueTheme from './themes/blueTheme';
import redTheme from './themes/redTheme';

import App from './App';

export default function Index() {
	const [theme, setTheme] = useState(lightTheme);

	async function updateStorage(themeName) {
		try {
			await AsyncStorage.setItem('theme', themeName);
		} catch (err) {
			console.error('Erro ao salvar tema: ' + err);
		}
	}

	const reducer = (state, action) => {
		updateStorage(action.type);

		switch (action.type) {
			case 'dark':
				setTheme(darkTheme);
				break;
			case 'light':
				setTheme(lightTheme);
				break;
			case 'tritanopia':
			case 'tritanomaly':
				setTheme(tomatoTheme);
				break;
			case 'protanopia':
			case 'protanomaly':
				setTheme(blueTheme);
				break;
			case 'deuteranopia':
			case 'deuteranomaly':
				setTheme(redTheme);
				break;
			default:
				updateStorage('light');
				console.error(`Color mode ${action.type} not found.`);

				setTheme(lightTheme);
				break;
		}
	};

	return (
		<NavigationContainer>
			<ThemeSwitchProvider reducer={reducer} initialState={lightTheme}>
				<ThemeProvider value={theme}>
					<App />
				</ThemeProvider>
			</ThemeSwitchProvider>
		</NavigationContainer>
	);
}
