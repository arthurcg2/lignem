import React from 'react';
import { ScrollView, Image, Text } from 'react-native';
import Markdown from 'react-native-simple-markdown';

import contents from '../../../contents/contents';
import images from '../../../contents/images';
import { markdownStyles } from './styles';

const ContentsScreen = ({ navigation, route }) => {
	navigation.setOptions({
		title: route.params.contentPageTitle,
	});

	return (
		<ScrollView style={{
			padding: 5,
			backgroundColor: '#5947A9',
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
