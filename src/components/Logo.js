import React from 'react';
import { Image } from 'react-native';

import lignem from '../../assets/lignem_small.png';

const Logo = () => {
	return (
		<Image
			source={lignem}
			style={{
				width: 35,
				height: 35,
				marginRight: 0,
				alignSelf: 'center',
			}}
		/>
	);
};

export default Logo;
