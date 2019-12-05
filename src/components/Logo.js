import React from 'react';
import { Image } from 'react-native';

import lignem from '../../assets/lignem_small.png';

const Logo = ({ type = 'secondary' }) => {
	return (
		<Image
			source={lignem}
			style={{
				width: 35,
				height: 35,
				marginRight: type == 'secondary' ? 10 : 0,
				alignSelf: 'center',
			}}
		/>
	);
};

export default Logo;
