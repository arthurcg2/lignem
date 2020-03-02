import React, { useState, useEffect } from 'react';
import { ActivityIndicator, ScrollView, Image, Text } from 'react-native';
import Markdown from 'react-native-simple-markdown';

import { generateStyles } from './styles'
import contents from '../../../contents/contents';
import images from '../../../contents/images';
import { useTheme } from '@react-navigation/native'

const ContentsScreen = ({ navigation, route }) => {
	const [markdownStyles, setMarkdownStyles] = useState({});
	const [content, setContent] = useState();
	const [loadingColor, setLoadingColor] = useState("");
	const [containerColor, setContainerColor] = useState("");

	const theme = useTheme();

	useEffect(() => {
		setLoadingColor(theme.colors.primary)
		setContainerColor(theme.colors.background)
		setTimeout(loadContent, 10)
	}, []);

	useEffect(() => {
		setMarkdownStyles(generateStyles(theme));
	}, [theme, content]);

	navigation.setOptions({
		title: route.params.contentPageTitle,
	});

	async function loadContent(){
		await setContent(contents[route.params.contentJSONName])
		setLoadingColor('transparent')
		setContainerColor(theme.colors.primary)
	} 

	return (
		<ScrollView style={{
			padding: 5,
			backgroundColor: containerColor,
		}}>
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
			<ActivityIndicator size='large' color={loadingColor}/>
		</ScrollView>
	);
};

export default ContentsScreen;
