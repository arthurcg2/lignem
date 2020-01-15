import React, { useEffect, useState } from 'react';
import { View, ScrollView, Switch, Text, StyleSheet } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import Logo from '../../components/Logo';

import { useThemeValue } from '../../states/ThemeState';

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
	{
		title: 'Outros',
		sub: 'Configurações gerais de acessiblidade',
		navigate: 'Outros',
		icon: 'accessibility',
		chevron: true,
	},
];

const Settings = ({ navigation }) => {
	const [darkmode, setDarkmode] = useState(false);
	const [, dispatch] = useThemeValue();

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
		dispatch({
			type: !darkmode ? 'enableDarkMode' : 'enableLightMode',
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
					style={styles.listItem}
					accessible
					accessibilityLabel="Tons mais escuros para o Lignem"
					leftIcon={{ name: 'brightness-3' }}
					rightElement={
						<Switch
							value={darkmode}
							onValueChange={handleChange}
							trackColor={{ true: '#937BE3' }}
							thumbColor="#FFF"
						/>
					}
					bottomDivider
				/>
				{options.map((item, i) => (
					<ListItem
						title={item.title}
						subtitle={item.sub}
						style={styles.listItem}
						accessible
						accessibilityLabel={item.sub}
						leftIcon={{ name: item.icon }}
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
						style={styles.listItem}
						accessible
						accessibilityLabel={item.sub}
						leftIcon={{ name: item.icon }}
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

Settings.navigationOptions = {
	headerTitle: <Logo />,
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
	},
	title: {
		fontSize: 30,
		color: '#333',
		marginLeft: 18,
		marginTop: 10,
		marginBottom: 20,
	},
});

export default Settings;
