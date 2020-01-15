import Default from './default';
import colorblind from 'color-blind';

export default function(type) {
	return {
		background: '#FFF',
		foreground: colorblind[type](Default.foreground),
		statusBarStyle: 'dark-content',
	};
}
