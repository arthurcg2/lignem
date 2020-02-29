import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

const Acessibilidade = () => {
	const theme = useTheme()

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.background }}>
			<Text style={{ color: theme.colors.text }}>Tela de configuração geral de acessibilidade</Text>
		</View>
	);
};

export default Acessibilidade;
