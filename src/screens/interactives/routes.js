import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import InterativoTeste from './InterativoTesteScreen';

const Router = createStackNavigator(
	{
		InterativoTeste,
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
