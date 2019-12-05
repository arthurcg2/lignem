import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

import Logo from '../components/Logo';
import Lottie from 'lottie-react-native';

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
	headerTitle: <Logo type="primary" />,
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
