import React, { useState } from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { ListItem } from 'react-native-elements';

const list = [
	{
		title: 'Protanopia',
		sub: 'Deficiência total nos cones vermelhos',
	},
	{
		title: 'Protanomalia',
		sub: 'Deficiência parcial nos cones vermelhos',
	},
	{
		title: 'Deuteranopia',
		sub: 'Deficiência total nos cones verdes',
	},
	{
		title: 'Deuteranomalia',
		sub: 'Deficiência parcial nos cones verdes',
	},
	{
		title: 'Tritanopia',
		sub: 'Deficiência total nos cones azuis',
	},
	{
		title: 'Tritanomalia',
		sub: 'Deficiência total nos cones azuis',
	},
];

const Daltonismo = () => {
	const [state, setState] = useState(false);

	return (
		<View style={styles.container}>
			<View>
				{list.map((l, i) => (
					<ListItem
						key={i}
						title={l.title}
						subtitle={l.sub}
						rightElement={
							<Switch
								value={state}
								onValueChange={() => {
									setState(!state);
								}}
								trackColor={{ true: '#937BE3' }}
								thumbColor="#FFF"
							/>
						}
						bottomDivider
					/>
				))}
			</View>
		</View>
	);
};

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
