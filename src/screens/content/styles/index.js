import { StyleSheet, Dimensions } from 'react-native';

export const markdownStyles = StyleSheet.create({
	view: {
		borderWidth: 2,
		borderColor: '#7159C1',
		margin: 5,
		padding: 10,
	},
	image: {
		width: 200,
		height: 200,
		left: Dimensions.get('window').width / 2 - 110,
		marginVertical: 10,
		resizeMode: 'contain',
	},
	paragraph: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingVertical: 6,
	},
	list: {
		paddingVertical: 6,
		paddingLeft: 6,
	},
	heading1: {
		fontSize: 32,
		alignSelf: 'center',
		fontWeight: '600',
		paddingBottom: 10,
		color: '#5947A9',
	},
	heading2: {
		fontSize: 24,
		color: '#333',
	},
	heading3: {
		fontSize: 20,
		color: '#444',
	},
	link: {
		color: '#5947A9',
		textDecorationLine: 'underline',
	},
	mailTo: {
		color: '#5947A9',
		textDecorationLine: 'underline',
	},
});
