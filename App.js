import React from 'react';
import { StatusBar, View, Text } from 'react-native';

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
				<Text style={{ color: '#7159C1', fontSize: 32, fontWeight: 'bold' }}>
					Lignem
				</Text>
			</View>
		</>
	);
}
