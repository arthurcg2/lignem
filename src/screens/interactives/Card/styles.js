import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'flex-end',
		backgroundColor: '#b79732',
	},
	image: {
		position: 'relative',
		width: '100%',
		height: '100%',
	},
	labelContainer: {
		width: '100%',
		alignSelf: 'flex-end',
		position: 'absolute',
		backgroundColor: 'rgba(106, 66, 46, 0.6)',
		padding: 10,
	},
	label: {
		textAlign: 'center',
		fontFamily: 'Montserrat',
		fontSize: 16,
		color: '#DDD',
	},
});
