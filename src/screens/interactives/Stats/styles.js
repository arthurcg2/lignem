import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	statsContainer: {
		height: '25%',
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	stat: {
		width: '30%',
		height: '100%',
		alignItems: 'center',
	},
	statBar: {
		width: 30,
		height: 75,
		marginBottom: 10,
		borderWidth: 2,
		borderColor: '#6048b0',
		padding: 2,
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
});
