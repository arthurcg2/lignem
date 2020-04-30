import React, { useEffect, useState, useRef } from 'react';
import {
	View,
	ScrollView,
	Switch,
	Text,
	StyleSheet,
	AccessibilityInfo,
	findNodeHandle,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { ListItem, Divider } from 'react-native-elements';

import { useTheme } from '@react-navigation/native';
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
	const initialFocus = useRef(null);
	const [darkmode, setDarkmode] = useState(false);
	const [isMotorAccessibilityEnabled, setMotorAccessibilityEnabled] = useState(
		false,
	);
	const switchTheme = useSwitchTheme();
	const isSwitchDisabled = false;
	const theme = useTheme();

	useEffect(() => {
		AccessibilityInfo.announceForAccessibility('Página de configurações.');
	}, []);

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			if (initialFocus.current)
				AccessibilityInfo.setAccessibilityFocus(
					findNodeHandle(initialFocus.current),
				);
		});

		// Return the function to unsubscribe from the event so it gets removed on unmount
		return unsubscribe;
	}, [navigation, initialFocus]);

	useEffect(() => {
		setStyles(generateStyles(theme));
		async function getInitialState() {
			if (theme.name == 'dark') {
				setDarkmode(true);
				return;
			}

			setDarkmode(false);
		}

		async function getMotorAccessibilityState() {
			const motorAcessibilityState = await AsyncStorage.getItem(
				'isMotorAccessibilityEnabled',
			);
			if (motorAcessibilityState === 'true') setMotorAccessibilityEnabled(true);
			else setMotorAccessibilityEnabled(false);
		}

		getInitialState();
		getMotorAccessibilityState();
	}, [theme]);

	function handleChange() {
		switchTheme({
			type: !darkmode ? 'dark' : 'light',
		});
		setDarkmode(!darkmode);
	}

	async function handleMotorAccessibilityChange() {
		if (isMotorAccessibilityEnabled)
			await AsyncStorage.setItem('isMotorAccessibilityEnabled', 'false');
		else await AsyncStorage.setItem('isMotorAccessibilityEnabled', 'true');
		setMotorAccessibilityEnabled(!isMotorAccessibilityEnabled);
	}

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.title} importantForAccessibility="no">
				Geral
			</Text>
			<View>
				{!theme.dark && <Divider />}
				<ListItem
					ref={initialFocus}
					title="Tema escuro"
					subtitle="Tons mais escuros para o Lignem"
					containerStyle={{ backgroundColor: theme.colors.background }}
					titleStyle={{ color: theme.colors.text }}
					subtitleStyle={{ color: theme.colors.text }}
					accessible
					accessibilityLabel="Opção: ativar o modo de cores escuras."
					accessibilityState={{ selected: darkmode }}
					leftIcon={{ name: 'brightness-3', color: theme.colors.text }}
					onPress={!isSwitchDisabled ? handleChange : () => {}}
					rightElement={
						<Switch
							importantForAccessibility="no"
							value={darkmode}
							disabled={isSwitchDisabled}
							onValueChange={handleChange}
							trackColor={{ true: theme.colors.primary }}
							thumbColor="#FFF"
						/>
					}
					bottomDivider={!theme.dark}
				/>
				{theme.dark && (
					<Divider style={{ height: 0.5, backgroundColor: '#5A5C5F' }} />
				)}
				{options.map((item, i) => (
					<View key={'options-' + i}>
						<ListItem
							title={item.title}
							subtitle={item.sub}
							containerStyle={{ backgroundColor: theme.colors.background }}
							titleStyle={{ color: theme.colors.text }}
							subtitleStyle={{ color: theme.colors.text }}
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
							bottomDivider={!theme.dark}
						/>
						{i !== options.length - 1 && theme.dark && (
							<Divider style={{ height: 0.5, backgroundColor: '#5A5C5F' }} />
						)}
					</View>
				))}
			</View>
			<Text style={styles.title} importantForAccessibility="no">
				Acessibilidade
			</Text>
			<View>
				{!theme.dark && <Divider />}
				<ListItem
					title="Modo de deficiência motora"
					subtitle="Assistência de deficiência motora do jogo"
					containerStyle={{ backgroundColor: theme.colors.background }}
					titleStyle={{ color: theme.colors.text }}
					subtitleStyle={{ color: theme.colors.text }}
					accessible
					accessibilityLabel="Opção: ativar o modo de deficiência motora para o jogo."
					accessibilityState={{ selected: isMotorAccessibilityEnabled }}
					leftIcon={{ name: 'accessibility', color: theme.colors.text }}
					onPress={handleMotorAccessibilityChange}
					rightElement={
						<Switch
							importantForAccessibility="no"
							value={isMotorAccessibilityEnabled}
							onValueChange={handleMotorAccessibilityChange}
							trackColor={{ true: theme.colors.primary }}
							thumbColor="#FFF"
						/>
					}
					bottomDivider={!theme.dark}
				/>
				{theme.dark && (
					<Divider style={{ height: 0.5, backgroundColor: '#5A5C5F' }} />
				)}
				{accessibilityOptions.map((item, i) => (
					<ListItem
						title={item.title}
						subtitle={item.sub}
						containerStyle={{ backgroundColor: theme.colors.background }}
						titleStyle={{ color: theme.colors.text }}
						subtitleStyle={{ color: theme.colors.text }}
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
						bottomDivider={!theme.dark}
						key={'accessibility-' + i}
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
			backgroundColor: theme.dark
				? theme.colors.backgroundDarken
				: theme.colors.background,
		},
		title: {
			fontSize: 30,
			color: theme.colors.text,
			marginLeft: 18,
			marginTop: 10,
			marginBottom: 20,
		},
	});
};

export default Settings;
