import React from 'react';
import { Image } from 'react-native';

import { useTheme } from '@react-navigation/native';

import lignem from '../../assets/logos/lignem_small_logo.png';
import lignemBlue from '../../assets/logos/lignem_small_logo_blue.png';
import lignemDark from '../../assets/logos/lignem_small_logo_dark.png';
import lignemDarkBlue from '../../assets/logos/lignem_small_logo_darkblue.png';
import lignemTomato from '../../assets/logos/lignem_small_logo_tomato.png';

const Logo = () => {
	const theme = useTheme();

	return (
		<Image
			source={(() => {
				if (theme.name == 'light') return lignem;
				if (theme.name == 'blue') return lignemBlue;
				if (theme.name == 'dark') return lignemDark;
				if (theme.name == 'darkblue') return lignemDarkBlue;
				if (theme.name == 'tomato') return lignemTomato;
			})()}
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
