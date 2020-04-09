import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Logo from '../../components/Logo';

import Settings from './SettingsScreen';
import Daltonismo from './DaltonismoScreen';
import Sobre from './SobreScreen';
import { useTheme } from '@react-navigation/native';

const Stack = createStackNavigator();

const Router = () => {
	const theme = useTheme();

	return (
		<Stack.Navigator
			screenOptions={{
				title: 'Título',
				headerTitleAlign: 'center',
				headerTintColor: theme.colors.primary,
				headerTitleStyle: {
					fontWeight: 'bold',
				},
				headerStyle: {
					backgroundColor: theme.colors.background,
				},
			}}
		>
			<Stack.Screen
				name="Settings"
				component={Settings}
				options={{ headerTitle: props => <Logo {...props} /> }}
			/>
			<Stack.Screen
				name="Daltonismo"
				component={Daltonismo}
				options={{
					headerTitle: 'Modo de daltonismo',
					headerBackTitle: 'Voltar para a página de configurações.',
					headerBackTitleVisible: false,
				}}
			/>
			<Stack.Screen
				name="Sobre"
				component={Sobre}
				options={{
					headerTitle: 'Sobre',
					headerBackTitle: 'Voltar para a página de configurações.',
					headerBackTitleVisible: false,
				}}
			/>
		</Stack.Navigator>
	);
};

export default Router;
