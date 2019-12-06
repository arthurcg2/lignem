import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

import Logo from '../components/Logo';

const Home = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Button
				title="Clique!"
				color="#7159C1"
				style={styles.button}
				onPress={() => {
					navigation.navigate('Teste');
				}}
			/>
		</View>
	);
};

Home.navigationOptions = {
	headerTitle: <Logo />,
	headerRight: <View />,
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		fontWeight: 'bold',
	},
});

export default Home;
