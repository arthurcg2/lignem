import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Logo from '../../components/Logo';
import InterativoTeste from './InterativoTesteScreen';

const Router = createStackNavigator(
	{
		InterativoTeste,
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
