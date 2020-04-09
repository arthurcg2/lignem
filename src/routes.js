import React from 'react';
import {
	createBottomTabNavigator,
	BottomTabBar,
} from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Conteudo from './screens/content/routes';
import Settings from './screens/settings/routes';
import Interativos from './screens/interactives/routes';

const Tab = createBottomTabNavigator();

const Router = () => {
	const theme = useTheme();

	return (
		<Tab.Navigator
			tabBarOptions={{
				activeTintColor: theme.colors.primary,
				inactiveTintColor: 'grey',
			}}
			tabBar={props => (
				<BottomTabBar {...props} activeTintColor={theme.colors.primary} />
			)}
			initialRouteName="Conteudo"
		>
			<Tab.Screen
				name="Interativo"
				component={Interativos}
				options={{
					tabBarLabel: 'Jogo',
					tabBarAccessibilityLabel: 'Navegação: ir para a página do jogo',
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
					tabBarAccessibilityLabel: 'Navegação: ir para a página dos conteúdos',
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
					tabBarAccessibilityLabel:
						'Navegação: ir para a página de configurações',
					tabBarIcon: ({ color, size }) => (
						<Icon name="settings" color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default Router;
