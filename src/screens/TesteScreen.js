import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import Markdown from 'react-native-markdown-package';

const Teste = () => {
	const [mdText, setMdText] = useState('Não definido');

	useEffect(() => {
		setMdText(async () => {
			const text = await fetch('../../docs/setup.md');
			console.log(text);
			return text.text;
		});
	});

	return (
		<ScrollView>
			<Markdown styles={MarkdownStyles} onLink={url => Linking.openURL(url)}>
				{mdText}
			</Markdown>
		</ScrollView>
	);
};

Teste.navigationOptions = {
	title: 'Teste',
};

const MarkdownStyles = {
	heading1: {
		color: 'red',
	},
	heading2: {
		color: 'green',
		textAlign: 'right',
	},
	strong: {
		color: 'blue',
	},
	em: {
		color: 'cyan',
	},
	text: {
		color: 'black',
	},
	blockQuoteText: {
		color: 'grey',
	},
	blockQuoteSection: {
		flexDirection: 'row',
	},
	blockQuoteSectionBar: {
		width: 3,
		height: null,
		backgroundColor: '#DDDDDD',
		marginRight: 15,
	},
	codeBlock: {
		fontFamily: 'Courier',
		fontWeight: '500',
		backgroundColor: '#DDDDDD',
	},
	tableHeader: {
		backgroundColor: 'grey',
	},
};

export default Teste;
