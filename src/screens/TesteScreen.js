import React from 'react';
import { ScrollView, Image } from 'react-native';
import Markdown from 'react-native-simple-markdown';

import { teste } from '../../contents/contents';
import images from '../../contents/images';
import { markdownStyles } from './styles';

const TesteScreen = () => {
	return (
		<ScrollView>
			<Markdown
				styles={markdownStyles}
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
				{teste}
			</Markdown>
		</ScrollView>
	);
};

TesteScreen.navigationOptions = {
	title: 'Teste',
};

export default TesteScreen;
