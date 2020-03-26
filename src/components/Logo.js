import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';

import { useTheme } from '@react-navigation/native';

import lignem from '../../assets/logos/lignem_small_logo.png';
import lignemBlue from '../../assets/logos/lignem_small_logo_blue.png';
import lignemDark from '../../assets/logos/lignem_small_logo_dark.png';
import lignemRed from '../../assets/logos/lignem_small_logo_red.png';
import lignemTomato from '../../assets/logos/lignem_small_logo_tomato.png';

const Logo = () => {
	const currentImage = useState(lignem);
	const theme = useTheme();

	useEffect(() => {
		if (theme.name == 'light') setCurrentImage(lignem);
		if (theme.name == 'blue') setCurrentImage(lignemBlue);
		if (theme.name == 'dark') setCurrentImage(lignemDark);
		if (theme.name == 'red') setCurrentImage(lignemRed);
		if (theme.name == 'tomato') setCurrentImage(lignemTomato);
	}, [theme]);

	return (
		<Image
			source={currentImage}
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
