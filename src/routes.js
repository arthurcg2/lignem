import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
	createBottomTabNavigator,
	BottomTabBar,
} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Conteudo from './screens/content/routes';
import Settings from './screens/settings/routes';
import Interativos from './screens/interactives/routes';

import { useThemeValue } from './states/ThemeState';

const Tab = createBottomTabNavigator();

const Router = () => {
	const [{ theme }] = useThemeValue();

	return (
		<NavigationContainer>
			<Tab.Navigator
				tabBarOptions={{
					activeTintColor: theme.foreground,
					inactiveTintColor: 'grey',
				}}
				tabBar={props => (
					<BottomTabBar {...props} activeTintColor={theme.foreground} />
				)}
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
		</NavigationContainer>
	);
};

export default Router;
