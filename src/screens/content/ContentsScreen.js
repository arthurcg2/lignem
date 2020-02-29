import React, { useState, useEffect } from 'react';
import { ScrollView, Image, Text } from 'react-native';
import Markdown from 'react-native-simple-markdown';

import { generateStyles } from './styles'
import contents from '../../../contents/contents';
import images from '../../../contents/images';
import { useTheme } from '@react-navigation/native'

const ContentsScreen = ({ navigation, route }) => {
	const [markdownStyles, setMarkdownStyles] = useState({});
	const theme = useTheme();

	useEffect(() => {
		setMarkdownStyles(generateStyles(theme));
	}, [theme]);

	navigation.setOptions({
		title: route.params.contentPageTitle,
	});

	return (
		<ScrollView style={{
			padding: 5,
			backgroundColor: theme.colors.primary,
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
				{contents[route.params.contentJSONName]}
			</Markdown>
		</ScrollView>
	);
};

export default ContentsScreen;
