import React from 'react';
import { Image, View, Text } from 'react-native';

import lignem from '../assets/lignem_small.png';

const Logo = ({ type = 'secondary' }) => {
	return (
		<Image
			source={lignem}
			style={{
				width: type == 'primary' ? 50 : 35,
				height: type == 'primary' ? 50 : 35,
				alignSelf: type == 'primary' ? 'flex-end' : 'center',
			}}
		/>
	);
};

export default Logo;
