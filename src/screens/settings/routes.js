import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Logo from '../../components/Logo';

import Settings from './SettingsScreen';
import Daltonismo from './DaltonismoScreen';
import Outros from './OutrosScreen';
import Sobre from './SobreScreen';

const Stack = createStackNavigator();

const Router = () => (
	<Stack.Navigator
		screenOptions={{
			title: 'Título',
			headerLayoutPreset: 'center',
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
			name="Settings"
			component={Settings}
			options={{
				headerTitle: <Logo />,
			}}
		/>
		<Stack.Screen
			name="Daltonismo"
			component={Daltonismo}
			options={{ headerTitle: 'Modo de daltonismo' }}
		/>
		<Stack.Screen
			name="Outros"
			component={Outros}
			options={{ headerTitle: 'Acessibilidade' }}
		/>
		<Stack.Screen
			name="Sobre"
			component={Sobre}
			options={{ headerTitle: 'Sobre' }}
		/>
	</Stack.Navigator>
);

export default Router;
