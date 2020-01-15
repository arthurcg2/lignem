import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useThemeValue } from '../../states/ThemeState';
import AsyncStorage from '@react-native-community/async-storage';

const Daltonismo = () => {
	const [deficiencias, setDeficiencias] = useState(new Array(6).fill(false));
	const [theme, dispatch] = useThemeValue();

	function handleChange(item) {
		let newDef = new Array(6).fill(false);
		newDef[item.cod] = !deficiencias[item.cod];

		let defType = item.title;

		if (defType.endsWith('lia')) defType = defType.replace('ia', 'y');

		dispatch({
			type: newDef[item.cod] ? `enable${defType}Mode` : 'enableLightMode',
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
						title={l.title}
						accessible
						accessibilityLabel={l.sub}
						accessibilityRole="menuitem"
						subtitle={l.sub}
						bottomDivider
						rightElement={
							<Switch
								value={deficiencias[l.cod]}
								onValueChange={() => {
									handleChange(l);
								}}
								accessibilityRole="switch"
								trackColor={{ true: '#937BE3' }}
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

Daltonismo.navigationOptions = {
	title: 'Modo de daltonismo',
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
	},
});

export default Daltonismo;
