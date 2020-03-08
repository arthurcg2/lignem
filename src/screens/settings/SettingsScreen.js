import React, { useEffect, useState } from 'react';
import { View, ScrollView, Switch, Text, StyleSheet } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

import { useTheme } from '@react-navigation/native'
import { useSwitchTheme } from '../../states/ThemeSwitchContext';

const options = [
	{
		title: 'Sobre',
		sub: 'Informações sobre o app',
		icon: 'info',
		navigate: 'Sobre',
		chevron: true,
	},
];

const accessibilityOptions = [
	{
		title: 'Modo de daltonismo',
		sub: 'Configurações de daltonismo',
		icon: 'color-lens',
		navigate: 'Daltonismo',
		chevron: true,
	},
];

const Settings = ({ navigation }) => {
	const [styles, setStyles] = useState({});
	const [darkmode, setDarkmode] = useState(false);
	const switchTheme = useSwitchTheme();
	const isSwitchDisabled = true;
	const theme = useTheme()

	useEffect(() => {
		setStyles(generateStyles(theme))
	}, [theme])

	useEffect(() => {
		async function getInitialState() {
			const themeKey = await AsyncStorage.getItem('theme');

			if (themeKey === 'dark') {
				setDarkmode(true);
				return;
			}

			setDarkmode(false);
		}

		getInitialState();
	}, []);

	function handleChange() {
		switchTheme({
			type: !darkmode ? 'dark' : 'light',
		});
		setDarkmode(!darkmode);
	}

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.title}>Geral</Text>
			<View>
				<Divider />
				<ListItem
					title="Tema escuro"
					subtitle="Tons mais escuros para o Lignem"
					containerStyle={{backgroundColor: theme.colors.background}}
					titleStyle={{color: theme.colors.text}}
					subtitleStyle={{color: theme.colors.text}}
					accessible
					accessibilityLabel="Tons mais escuros para o Lignem"
					leftIcon={{ name: 'brightness-3', color: theme.colors.text }}
					onPress={!isSwitchDisabled ? handleChange : () => {}}
					rightElement={
						<Switch
							value={darkmode}
							disabled={isSwitchDisabled}
							onValueChange={handleChange}
							trackColor={{ true: theme.colors.primary }}
							thumbColor="#FFF"
						/>
					}
					bottomDivider
				/>
				{options.map((item, i) => (
					<ListItem
						title={item.title}
						subtitle={item.sub}
						containerStyle={{backgroundColor: theme.colors.background}}
						titleStyle={{color: theme.colors.text}}
						subtitleStyle={{color: theme.colors.text}}
						accessible
						accessibilityLabel={item.sub}
						leftIcon={{ name: item.icon, color: theme.colors.text }}
						rightElement={item.rightElement ? item.rightElement : null}
						onPress={() => {
							if (item.navigate) {
								navigation.navigate(item.navigate);
							} else if (item.onPress) {
								item.onPress();
							}
						}}
						chevron={item.chevron}
						bottomDivider
						key={i}
					/>
				))}
			</View>
			<Text style={styles.title}>Acessibilidade</Text>
			<View>
				<Divider />
				{accessibilityOptions.map((item, i) => (
					<ListItem
						title={item.title}
						subtitle={item.sub}
						containerStyle={{backgroundColor: theme.colors.background}}
						titleStyle={{color: theme.colors.text}}
						subtitleStyle={{color: theme.colors.text}}
						accessible
						accessibilityLabel={item.sub}
						leftIcon={{ name: item.icon, color: theme.colors.text }}
						rightElement={item.rightElement ? item.rightElement : null}
						onPress={() => {
							if (item.navigate) {
								navigation.navigate(item.navigate);
							} else if (item.onPress) {
								item.onPress();
							}
						}}
						chevron={item.chevron}
						bottomDivider
						key={i}
					/>
				))}
			</View>
		</ScrollView>
	);
};

const generateStyles = theme => {
	return StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.colors.background,
		},
		title: {
			fontSize: 30,
			color: theme.colors.text,
			marginLeft: 18,
			marginTop: 10,
			marginBottom: 20,
		},
	});
}

export default Settings;
