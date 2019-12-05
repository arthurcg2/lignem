import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Logo from './components/Logo';

import Home from './screens/HomeScreen';
import Teste from './screens/TesteScreen';

const Router = createStackNavigator(
	{
		Home,
		Teste,
	},
	{
		headerLayoutPreset: 'center',
		defaultNavigationOptions: {
			title: 'Título',
			headerRight: <Logo />,
			headerTintColor: '#7159C1',
			headerTitleStyle: {
				fontWeight: 'bold',
			},
		},
	},
);

export default createAppContainer(Router);
