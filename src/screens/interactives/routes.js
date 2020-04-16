import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Logo from '../../components/Logo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';

import Game from './GameScreen';
import Tutorial from './GameTutorial';

const Stack = createStackNavigator();

const Router = ({ navigation }) => {
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
				name="Game"
				component={Game}
				options={{
					headerTitle: props => <Logo {...props} />,
					headerRight: props => (
						<Icon
							accessibilityHint="Abrir o tutorial do jogo."
							color={theme.colors.primary}
							size={32}
							style={{ marginRight: 15 }}
							name="help-outline"
							onPress={() => {
								navigation.navigate('Tutorial');
							}}
							{...props}
						/>
					),
				}}
			/>
			<Stack.Screen
				name="Tutorial"
				component={Tutorial}
				options={{ headerShown: false, tabBarVisible: false }}
			/>
		</Stack.Navigator>
	);
};

export default Router;
