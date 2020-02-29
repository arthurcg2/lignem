import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Logo from '../../components/Logo';

import Home from './HomeScreen';
import Content from './ContentsScreen';
import { useTheme } from '@react-navigation/native'

const Stack = createStackNavigator();

const Router = () => {
	const theme = useTheme()

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
				name="Home"
				component={Home}
				options={{ headerTitle: props => <Logo {...props} /> }}
			/>
			<Stack.Screen name="Content" component={Content} />
		</Stack.Navigator>
	)
}

export default Router;
