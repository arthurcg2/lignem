import React from 'react';
import { ScrollView, Image } from 'react-native';
import Markdown from 'react-native-simple-markdown';
import { teste } from '../../contents/contents';
import images from '../../contents/images';

console.log(images);

const TesteScreen = () => {
	return (
		<ScrollView>
			<Markdown
				rules={{
					image: {
						react: (node, output, state) => {
							return (
								<Image
									key={state.key}
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
