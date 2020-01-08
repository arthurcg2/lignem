import React from 'react';
import { View, Text } from 'react-native';

const Acessibilidade = () => {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Tela de configuração geral de acessibilidade</Text>
		</View>
	);
};

Acessibilidade.navigationOptions = {
	title: 'Acessibilidade',
};

export default Acessibilidade;
