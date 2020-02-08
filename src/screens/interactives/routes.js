import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Game from './GameScreen';
import Tutorial from './TutorialScreen'

const Router = createStackNavigator(
	{
		Tutorial,
		Game,
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
