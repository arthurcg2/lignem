import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';

import Logo from '../components/Logo';

const Home = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<ScrollView style={styles.cardsList}>
				<Card
					image={require('../../assets/hidreletrica.jpg')}
					title="Exemplo"
					titleStyle={styles.title}
				>
					<Text style={styles.description}>
						Exercitation officia exercitation anim nostrud aliqua aliquip qui
						anim.
					</Text>
					<Button
						title="Ir para a página!"
						color="#7159C1"
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

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
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
		color: '#7159C1',
	},
});

export default Home;
