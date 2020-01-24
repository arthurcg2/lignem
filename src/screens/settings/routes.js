import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Settings from './SettingsScreen';
import Daltonismo from './DaltonismoScreen';
import Outros from './OutrosScreen';
import Sobre from './SobreScreen';

const Router = createStackNavigator(
	{
		Settings,
		Daltonismo,
		Outros,
		Sobre,
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
