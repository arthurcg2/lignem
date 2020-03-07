import React, { useState, useEffect } from 'react';
import { ScrollView, Image, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Markdown from 'react-native-simple-markdown';


import contents from '../../../contents/contents';
import images from '../../../contents/images';
import { generateStyles } from './styles';

const ContentsScreen = ({ navigation, route }) => {
	const [markdownStyles, setMarkdownStyles] = useState({})
	const [content, setContent] = useState(null);
	const theme = useTheme();

	useEffect(() => {
		setMarkdownStyles(generateStyles(theme))
	}, [])

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
		>
			{content ? (
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
					}}
				>
					{content}
				</Markdown>
			) : (
				<ActivityIndicator size="large" color={theme.colors.primary} />
			)}
		</ScrollView>
	);
};

export default ContentsScreen;