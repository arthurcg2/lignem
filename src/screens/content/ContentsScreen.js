import React, { useState, useEffect } from 'react';
import {
	ScrollView,
	View,
	Text,
	Image,
	ActivityIndicator,
	TouchableOpacity,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Markdown from 'react-native-simple-markdown';

import contents from '../../../contents/contents';
import images from '../../../contents/images';
import { generateStyles } from './styles';

const ContentsScreen = ({ navigation, route }) => {
	const [markdownStyles, setMarkdownStyles] = useState({});
	const [content, setContent] = useState(null);
	const theme = useTheme();

	useEffect(() => {
		setMarkdownStyles(generateStyles(theme));
	}, [theme]);

	useEffect(() => {
		setTimeout(() => setContent(contents[route.params.contentJSONName]), 1);
	}, [content]);

	navigation.setOptions({
		title: route.params.contentPageTitle,
	});

	return (
		<ScrollView
			style={{
				backgroundColor: theme.colors.background,
			}}
			contentContainerStyle={{ flexGrow: 1 }}
		>
			{content ? (
				<>
					<Markdown
						styles={markdownStyles}
						errorHandler={(errors, children) => <Text>{children}</Text>}
						rules={{
							image: {
								react: (node, output, state) => {
									return (
										<Image
											key={state.key}
											style={markdownStyles.image}
											source={images[node.target.split('.')[0]]}
										/>
									);
								},
							},
							paragraph: {
								react: (node, output, state) => {
									let currentText = '',
										newNodeContent = [];

									node.content.forEach((element, i) => {
										if (element.type === 'text') {
											currentText += element.content;
										} else {
											if (currentText) {
												newNodeContent.push({
													content: currentText,
													type: 'text',
												});
												currentText = '';
											}
											newNodeContent.push(element);
										}
									});

									if (currentText) {
										newNodeContent.push({
											content: currentText,
											type: 'text',
										});
									}

									return (
										<View
											accessible
											key={state.key}
											style={markdownStyles.paragraph}
										>
											{output(newNodeContent, state)}
										</View>
									);
								},
							},
						}}
					>
						{content}
					</Markdown>
					<TouchableOpacity
						acessible
						accessibilityLabel="Ir para a página de fontes"
						accessibilityRole="button"
						onPress={() => {
							navigation.navigate('Configuracoes', { screen: 'Fontes' });
						}}
					>
						<Text style={markdownStyles.heading1}>Ir para as fontes</Text>
					</TouchableOpacity>
				</>
			) : (
				<View
					style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
				>
					<ActivityIndicator size="large" color={theme.colors.primary} />
				</View>
			)}
		</ScrollView>
	);
};

export default ContentsScreen;
