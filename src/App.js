import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Router from './routes';
import { useThemeValue } from './states/ThemeState';

export default function App() {
	const [state, dispatch] = useThemeValue();

	useEffect(() => {
		async function getStorageDarkMode() {
			const themeKey = await AsyncStorage.getItem('theme');

			if (themeKey === 'dark') {
				dispatch({
					type: 'enableDarkMode',
				});
				return;
			} else {
				dispatch({
					type: 'enableLightMode',
				});
			}
		}

		getStorageDarkMode();
	}, []);

	console.log(state.theme);

	return (
		<>
			<StatusBar
				barStyle={state.theme.statusBarStyle}
				backgroundColor={state.theme.background}
			/>
			<Router />
		</>
	);
}
