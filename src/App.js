import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Router from './routes';
import { useThemeValue } from './states/ThemeState';

export default function App() {
	const [state, dispatch] = useThemeValue();

	useEffect(() => {
		async function getStorageDarkMode() {
			let themeKey = await AsyncStorage.getItem('theme');
			if (!themeKey) {
				themeKey = 'light';
			}

			if (themeKey === 'dark') {
				dispatch({
					type: 'enableDarkMode',
				});
				return;
			} else if (themeKey === 'light') {
				dispatch({
					type: 'enableLightMode',
				});
			} else {
				dispatch({
					type: `enable${themeKey}Mode`,
				});
			}
		}

		getStorageDarkMode();
	}, []);

	return (
		<>
			<StatusBar
				barStyle={state.theme.statusBarStyle}
				backgroundColor="#EFEFEF"
			/>
			<Router />
		</>
	);
}
