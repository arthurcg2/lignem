import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Router from './routes';
import { useThemeValue } from './states/ThemeState';

export default function App() {
	const [state, dispatch] = useThemeValue();

	useEffect(() => {
		async function getStorageDarkMode() {
			const darkModeKey = await AsyncStorage.getItem('darkmode');

			if (darkModeKey === 'true') {
				dispatch({
					type: 'enableDarkMode',
				});
				return;
			}
			dispatch({
				type: 'disableDarkMode',
			});
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
