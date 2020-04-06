import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Logo from '../../components/Logo';

import Game from './GameScreen';
import Tutorial from './GameTutorial';

const Stack = createStackNavigator();

const Router = () => (
	<Stack.Navigator
		screenOptions={{
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
			name="Game"
			component={Game}
			options={{ headerTitle: props => <Logo {...props} /> }}
		/>
		<Stack.Screen
			name="Tutorial"
			component={Tutorial}
			options={{ headerShown: false, tabBarVisible: false}}
		/>
	</Stack.Navigator>
);

export default Router;
