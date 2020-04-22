import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { ThemeSwitchProvider } from './states/ThemeSwitchContext';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import lightTheme from './themes/default';
import darkTheme from './themes/dark';
import tomatoTheme from './themes/tomato';
import blueTheme from './themes/blueTheme';
import darkBlueTheme from './themes/darkBlueTheme';

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
				changeNavigationBarColor('#232931', false);
				break;
			case 'light':
				setTheme(lightTheme);
				changeNavigationBarColor('#FFFFFF', true);
				break;
			case 'tritanopia':
			case 'tritanomalia':
				setTheme(tomatoTheme);
				changeNavigationBarColor('#FFFFFF', true);
				break;
			case 'protanopia':
			case 'protanomalia':
				setTheme(blueTheme);
				changeNavigationBarColor('#FFFFFF', true);
				break;
			case 'deuteranopia':
			case 'deuteranomalia':
				setTheme(darkBlueTheme);
				changeNavigationBarColor('#FFFFFF', true);
				break;
			default:
				updateStorage('light');
				console.error(`Color mode ${action.type} not found.`);

				setTheme(lightTheme);
				changeNavigationBarColor('#FFFFFF', true);
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
