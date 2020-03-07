import { StyleSheet } from 'react-native';

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
		position: 'absolute',
	},
	swap: {
		height: 320,
		borderRadius: 10,
		width: 280,
		margin: 'auto',
		flexDirection: 'row',
	},
	no: {
		paddingVertical: 10,
		width: 280,
		backgroundColor: 'red',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		justifyContent: 'center',
		alignItems: 'flex-start',
		position: 'absolute',
	},
	yes: {
		paddingVertical: 10,
		width: 280,
		backgroundColor: 'green',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		justifyContent: 'center',
		alignItems: 'flex-end',
		position: 'absolute',
	},
	optionText: {
		color: 'white',
		fontSize: 24,
		fontWeight: 'bold',
		paddingHorizontal: 20,
	},
});
