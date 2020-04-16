import { StyleSheet, Dimensions } from 'react-native';

const h = Dimensions.get('window').height;
const w = Dimensions.get('window').width;

export const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		margin: 0,
	},
	brand: {
		height: h <= 592 ? 280 : 320,
		borderRadius: 10,
		width: 280,
		margin: 'auto',
		position: 'absolute',
	},
	image: {
		height: h <= 592 ? 280 : 320,
	},
	swap: {
		height: h <= 592 ? 280 : 320,
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
	infoContainer: {
		position: 'absolute',
		width: '100%',
		zIndex: 3,
	},
	info: {
		textAlign: 'center',
		textShadowColor: '#000',
		textShadowOffset: { width: 1, height: -1 },
		textShadowRadius: 1,
		fontSize: 12,
		color: '#fff',
		fontWeight: 'bold',
		fontFamily: 'Montserrat',
	},
	accessibilityButtonsContainer: {
		width: w,
		position: 'absolute',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 10,
	},
	accessibilityButton: {
		width: 70,
		height: h <= 592 ? 280 : 320,
		borderRadius: 12,
		elevation: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
