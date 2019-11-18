import React from 'react';
import { StatusBar, View, Text } from 'react-native';
import Lottie from 'lottie-react-native';

export default function App() {
	return (
		<>
			<StatusBar barStyle="dark-content" backgroundColor="white" />
			<View
				style={{
					flex: 1,
					backgroundColor: 'white',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Text
					style={{
						color: '#7159C1',
						fontSize: 30,
						fontWeight: 'bold',
						marginBottom: 50,
					}}
				>
					Lignem
				</Text>
				<Lottie
					speed={2}
					source={require('./animations/earth.json')}
					autoSize
					autoPlay
					loop
				/>
			</View>
		</>
	);
}
