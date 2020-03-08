import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Logo from '../../components/Logo';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Home from './HomeScreen';
import Content from './ContentsScreen';
import { useTheme } from '@react-navigation/native';
import ContentTutorial from './ContentTutorial';

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
				name="Home"
				component={Home}
				options={{
					headerTitle: props => <Logo {...props} />,
					headerRight: props => (
						<Icon
							color={theme.colors.primary}
							size={32}
							style={{ marginRight: 15 }}
							name="help-outline"
							onPress={() => {
								navigation.navigate('TutorialLignem');
							}}
							{...props}
						/>
					),
				}}
			/>
			<Stack.Screen name="Content" component={Content} />
			<Stack.Screen
				name="TutorialLignem"
				component={ContentTutorial}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
};

export default Router;
