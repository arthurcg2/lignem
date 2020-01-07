import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Conteudo from './screens/content/routes';
import Settings from './screens/settings/routes';
import Interativos from './screens/interactives/routes';

export default createAppContainer(
	createBottomTabNavigator(
		{
			Conteudo: {
				screen: Conteudo,
				navigationOptions: {
					tabBarLabel: 'Conteudo',
					tabBarIcon: ({ tintColor }) => (
						<Icon name="chrome-reader-mode" color={tintColor} size={24} />
					),
				},
			},
			Configuracoes: {
				screen: Settings,
				navigationOptions: {
					tabBarLabel: 'Configurações',
					tabBarIcon: ({ tintColor }) => (
						<Icon name="settings" color={tintColor} size={24} />
					),
				},
			},
			Interativo: {
				screen: Interativos,
				navigationOptions: {
					tabBarLabel: 'Jogos',
					tabBarIcon: ({ tintColor }) => (
						<Icon name="gamepad" color={tintColor} size={24} />
					),
				},
			},
		},
		{
			order: ['Interativo', 'Conteudo', 'Configuracoes'],
			initialRouteName: 'Conteudo',
			tabBarOptions: {
				activeTintColor: '#7159C1',
				inactiveTintColor: 'grey',
			},
		},
	),
);
