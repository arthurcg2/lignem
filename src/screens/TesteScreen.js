import React from 'react';
import { ScrollView } from 'react-native';
import Markdown from 'react-native-markdown-package';
import { teste } from '../../contents/contents';

const TesteScreen = () => {
	return (
		<ScrollView>
			<Markdown>{teste}</Markdown>
		</ScrollView>
	);
};

TesteScreen.navigationOptions = {
	title: 'Teste',
};

export default TesteScreen;
