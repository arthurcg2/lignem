import React from 'react';
import { View, Text } from 'react-native';

import Logo from '../../components/Logo';

const InterativoMain = () => {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Tela de interativos</Text>
		</View>
	);
};

InterativoMain.navigationOptions = {
	headerTitle: <Logo />,
};

export default InterativoMain;
