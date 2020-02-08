import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		margin: 0,
	},
	brand: {
		height: 320,
		borderRadius: 10,
		width: 280,
		margin: 'auto',
		backgroundColor: 'rgba(248, 229, 92, 1)',
		alignSelf: 'center',
		position: 'absolute',
	},
	swap: {
		backgroundColor: 'rgba(248, 241, 193, 1)',
		height: 320,
		borderRadius: 10,
		width: 280,
		margin: 'auto',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	no: {
		height: 50,
		width: 280,
		backgroundColor: 'red',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
	},
	yes: {
		height: 50,
		width: 280,
		backgroundColor: 'green',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
	},
	optionText: {
		color: 'white',
		fontSize: 25,
		fontWeight: 'bold',
	},
});