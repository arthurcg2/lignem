import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './HomeScreen';
import Teste from './TesteScreen';
import Logo from '../../components/Logo';

const Router = createStackNavigator(
	{
		Home,
		Teste,
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
