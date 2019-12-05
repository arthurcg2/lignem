import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './screens/HomeScreen';
import Teste from './screens/TesteScreen';

const Router = createStackNavigator(
	{
		Home,
		Teste,
	},
	{
		headerLayoutPreset: 'center',
		defaultNavigationOptions: {
			title: 'Título',
			headerTintColor: '#7159C1',
			headerTitleStyle: {
				fontWeight: 'bold',
			},
		},
	},
);

export default createAppContainer(Router);
