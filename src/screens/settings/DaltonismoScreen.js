import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { ListItem } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

import { useTheme } from '@react-navigation/native';
import { useSwitchTheme } from '../../states/ThemeSwitchContext';

const Daltonismo = () => {
	const [deficiencias, setDeficiencias] = useState(new Array(6).fill(false));
	const [styles, setStyles] = useState({});
	const switchTheme = useSwitchTheme();
	const isSwitchDisabled = false;
	const theme = useTheme();

	useEffect(() => {
		setStyles(generateStyles(theme));
	}, [theme]);

	function handleChange(item) {
		let newDef = new Array(6).fill(false);
		newDef[item.cod] = !deficiencias[item.cod];

		let defType = item.title.toLowerCase();

		if (defType.endsWith('lia')) defType = defType.replace('ia', 'y');

		switchTheme({
			type: newDef[item.cod] ? defType : 'light',
		});

		setDeficiencias(newDef);
	}

	useEffect(() => {
		async function getType() {
			let type = await AsyncStorage.getItem('theme');
			if (type.endsWith('ly')) type = type.replace('y', 'ia');

			if (type != 'light' && type != 'dark') {
				list.forEach(el => {
					if (el.title == type) {
						let newDef = new Array(6).fill(false);
						newDef[el.cod] = !deficiencias[el.cod];
						setDeficiencias(newDef);
					}
				});
			}
		}

		getType();
	}, []);

	return (
		<View style={styles.container}>
			<View accessibilityRole="menu">
				{list.map((l, i) => (
					<ListItem
						key={i}
						containerStyle={{ backgroundColor: theme.colors.background }}
						titleStyle={{ color: theme.colors.text }}
						subtitleStyle={{ color: theme.colors.text }}
						title={l.title}
						accessible
						accessibilityLabel={l.sub}
						accessibilityRole="menuitem"
						subtitle={l.sub}
						bottomDivider
						onPress={() => {
							if (!isSwitchDisabled) handleChange(l);
						}}
						rightElement={
							<Switch
								disabled={isSwitchDisabled}
								value={deficiencias[l.cod]}
								onValueChange={() => {
									handleChange(l);
								}}
								accessibilityRole="switch"
								trackColor={{ true: theme.colors.primary }}
								thumbColor="#FFF"
							/>
						}
					/>
				))}
			</View>
		</View>
	);
};

const list = [
	{
		title: 'Protanopia',
		sub: 'Deficiência total nos cones vermelhos',
		cod: 0,
	},
	{
		title: 'Protanomalia',
		sub: 'Deficiência parcial nos cones vermelhos',
		cod: 1,
	},
	{
		title: 'Deuteranopia',
		sub: 'Deficiência total nos cones verdes',
		cod: 2,
	},
	{
		title: 'Deuteranomalia',
		sub: 'Deficiência parcial nos cones verdes',
		cod: 3,
	},
	{
		title: 'Tritanopia',
		sub: 'Deficiência total nos cones azuis',
		cod: 4,
	},
	{
		title: 'Tritanomalia',
		sub: 'Deficiência total nos cones azuis',
		cod: 5,
	},
];

const generateStyles = theme => {
	return StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.colors.background,
		},
	});
};

export default Daltonismo;
