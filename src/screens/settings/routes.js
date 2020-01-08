import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Logo from '../../components/Logo';
import Settings from './SettingsScreen';
import Daltonismo from './DaltonismoScreen';
import Geral from './GeralScreen';

const Router = createStackNavigator(
	{
		Settings,
		Daltonismo,
		Geral,
	},
	{
		headerLayoutPreset: 'center',
		defaultNavigationOptions: {
			title: 'Título',
			headerTintColor: '#7159C1',
			headerTitleStyle: {
				fontWeight: 'bold',
			},
			headerTitle: <Logo />,
		},
	},
);

export default createAppContainer(Router);
