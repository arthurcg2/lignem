import { StyleSheet, Dimensions } from 'react-native';

export const markdownStyles = StyleSheet.create({
	view: {
		padding: 10,
	},
	image: {
		width: 200,
		height: 200,
		left: Dimensions.get('window').width / 2 - 110,
		marginVertical: 10,
		resizeMode: 'contain',
	},
});
