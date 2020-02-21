import { StyleSheet, Dimensions } from 'react-native';

export const markdownStyles = StyleSheet.create({
	view: {
		backgroundColor: '#fff',
		borderRadius: 10,
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
		paddingHorizontal: 15,
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
		shadowColor: "#5947A9",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.32,
		shadowRadius: 5.46,
		elevation: 9,
		color: '#fff',
		backgroundColor: '#5947A9',
		width: '100%',
		textAlign: 'center',
		position: 'absolute',
		top: 0,
	},
	heading2: {
		fontSize: 24,
		color: '#333',
		paddingHorizontal: 10,
		marginVertical: 10,
		width: '100%',
		borderColor: '#5947A9',
		borderBottomWidth: 2,
	},
	heading3: {
		fontSize: 20,
		color: '#444',
		paddingHorizontal: 10,		
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
