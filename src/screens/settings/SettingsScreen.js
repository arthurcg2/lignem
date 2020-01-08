import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import Logo from '../../components/Logo';

const options = [
	{
		title: 'Modo de daltonismo',
		sub: 'Configurações de daltonismo',
		screenName: 'Daltonismo',
		icon: 'colorize',
	},
	{
		title: 'Acessibilidade',
		sub: 'Configurações gerais de acessiblidade',
		screenName: 'Geral',
		icon: 'accessibility',
	},
];

const Settings = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<View>
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

Settings.navigationOptions = {
	headerTitle: <Logo />,
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
	},
});

export default Settings;
