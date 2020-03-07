import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Logo from '../../components/Logo';

import Home from './HomeScreen';
import Content from './ContentsScreen';

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
			name="Home"
			component={Home}
			options={{ headerTitle: props => <Logo {...props} /> }}
		/>
		<Stack.Screen name="Content" component={Content} />
	</Stack.Navigator>
);

export default Router;
