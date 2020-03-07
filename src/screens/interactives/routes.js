import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Logo from '../../components/Logo';

import Game from './GameScreen';
<<<<<<< HEAD

const Router = createStackNavigator(
	{
		Game,
	},
	{
		headerLayoutPreset: 'center',
		defaultNavigationOptions: {
=======
import Tutorial from './TutorialScreen';

const Stack = createStackNavigator();

const Router = () => (
	<Stack.Navigator
		screenOptions={{
>>>>>>> origin/feature/configuracoes
			title: 'Título',
			headerTitleAlign: 'center',
			headerTintColor: '#7159C1',
			headerTitleStyle: {
				fontWeight: 'bold',
			},
			headerStyle: {
				backgroundColor: '#FAFAFA',
			},
		}}
	>
		<Stack.Screen
			name="Tutorial"
			component={Tutorial}
			options={{ headerTitle: props => <Logo {...props} /> }}
		/>
		<Stack.Screen
			name="Game"
			component={Game}
			options={{ headerTitle: props => <Logo {...props} /> }}
		/>
	</Stack.Navigator>
);

export default Router;
