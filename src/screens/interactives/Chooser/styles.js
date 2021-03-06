import { StyleSheet } from 'react-native';

import { widthPercentToDP, heightPercentToDP } from '../../../utils/dimensionsFunctions'

export const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		width: widthPercentToDP('100%'),
		height: heightPercentToDP('45%'),
		margin: 0,
	},
	brand: {
		height: '100%',
		borderRadius: 10,
		width: '80%',
		margin: 'auto',
		position: 'absolute',
	},
	image: {
		height: '100%',
		width: '100%',
	},
	swap: {
		height: '100%',
		borderRadius: 10,
		width: widthPercentToDP('80%'),
		margin: 'auto',
		flexDirection: 'row',
	},
	no: {
		paddingVertical: 10,
		width: '100%',
		backgroundColor: 'red',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		justifyContent: 'center',
		alignItems: 'flex-start',
		position: 'absolute',
	},
	yes: {
		paddingVertical: 10,
		width: '100%',
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
		width: widthPercentToDP('95%'),
		height: heightPercentToDP('45%'),
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	accessibilityButton: {
		width: widthPercentToDP('18%'),
		height: '100%',
		borderRadius: 12,
		elevation: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	centerAccessibilityButton: {
		flex: 1,
		height: '100%',
		backgroundColor: '#DDD',
		paddingHorizontal: 15,
		justifyContent: 'space-evenly',
	},
	centerMotorAccessibilityButton: {
		flex: 1,
		width: '100%',
		height: '100%',
	},
});
