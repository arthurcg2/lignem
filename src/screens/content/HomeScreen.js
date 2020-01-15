import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import Logo from '../../components/Logo';
import { useThemeValue } from '../../states/ThemeState';

const Home = ({ navigation }) => {
	const [{ theme }] = useThemeValue();
	const [styles, setStyles] = useState({});

	useEffect(() => {
		setStyles(generateStyles(theme));
	}, [theme]);

	return (
		<View style={styles.container}>
			<ScrollView style={styles.cardsList}>
				<Card
					image={require('../../../assets/hidreletrica.jpg')}
					title="Exemplo"
					titleStyle={styles.title}
				>
					<Text style={styles.description}>
						Exercitation officia exercitation anim nostrud aliqua aliquip qui
						anim.
					</Text>
					<Button
						title="Ir para a página!"
						color={theme.foreground}
						style={styles.button}
						onPress={() => {
							navigation.navigate('Teste');
						}}
					/>
				</Card>
			</ScrollView>
		</View>
	);
};

Home.navigationOptions = {
	headerTitle: <Logo />,
};

const generateStyles = theme => {
	return StyleSheet.create({
		container: {
			backgroundColor: theme.background,
			justifyContent: 'center',
			alignItems: 'center',
		},
		cardsList: {
			marginVertical: 10,
		},
		button: {
			fontWeight: 'bold',
		},
		description: {
			color: '#555',
			marginBottom: 10,
		},
		title: {
			color: theme.foreground,
		},
	});
};

export default Home;
