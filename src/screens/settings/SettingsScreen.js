import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ListItem } from 'react-native-elements';

const options = [
	{
		title: 'Daltonismo',
		sub: 'Configurações de daltonismo',
		screenName: 'Daltonismo',
		icon: 'colorize',
	},
	{
		title: 'Geral',
		sub: 'Configurações gerais de acessiblidade',
		screenName: 'Geral',
		icon: 'accessibility',
	},
];

export default ({ navigation }) => {
	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.sectionTitle}>Acessibilidade</Text>
				{options.map((item, i) => (
					<ListItem
						title={item.title}
						subtitle={item.sub}
						accessible
						accessibilityLabel={item.sub}
						onPress={() => navigation.navigate(item.screenName)}
						leftIcon={{ name: item.icon }}
						bottomDivider
						chevron
						key={i}
					/>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
	},
	sectionTitle: {
		fontSize: 20,
		marginHorizontal: 5,
		marginTop: 10,
	},
});
