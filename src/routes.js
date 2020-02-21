import React from 'react';
import {
	createBottomTabNavigator,
	BottomTabBar,
} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Conteudo from './screens/content/routes';
import Settings from './screens/settings/routes';
import Interativos from './screens/interactives/routes';

const Tab = createBottomTabNavigator();

const Router = () => {
	return (
		<Tab.Navigator
			tabBarOptions={{
				activeTintColor: '#7159C1',
				inactiveTintColor: 'grey',
			}}
			tabBar={props => <BottomTabBar {...props} activeTintColor={'#7159C1'} />}
			initialRouteName="Conteudo"
		>
			<Tab.Screen
				name="Interativo"
				component={Interativos}
				options={{
					tabBarLabel: 'Jogo',
					tabBarIcon: ({ color, size }) => (
						<Icon name="gamepad" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="Conteudo"
				component={Conteudo}
				options={{
					tabBarLabel: 'Conteúdo',
					tabBarIcon: ({ color, size }) => (
						<Icon name="chrome-reader-mode" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="Configuracoes"
				component={Settings}
				options={{
					tabBarLabel: 'Configurações',
					tabBarIcon: ({ color, size }) => (
						<Icon name="settings" color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default Router;
