import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { useSwitchTheme } from './states/ThemeSwitchContext';

import Router from './routes';

export default function App() {
	const switchTheme = useSwitchTheme();

	useEffect(() => {
		async function getStorageTheme() {
			let themeKey = await AsyncStorage.getItem('theme');
			if (!themeKey) {
				themeKey = 'light';
			}

			switchTheme({
				type: themeKey,
			});
		}

		getStorageTheme();
	}, []);

	return (
		<>
			<StatusBar barStyle={'dark-content'} backgroundColor="#EFEFEF" />
			<Router />
		</>
	);
}
