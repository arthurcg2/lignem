import { StyleSheet } from 'react-native';

import { widthPercentToDP, heightPercentToDP } from '../../../utils/dimensionsFunctions'

export default StyleSheet.create({
	statsContainer: {
		height: heightPercentToDP('25%'),
		width: widthPercentToDP('80%'),
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	stat: {
		width: '30%',
		alignItems: 'center',
	},
	statBar: {
		width: heightPercentToDP('5%'),
		height: widthPercentToDP('20%'),
		marginBottom: 10,
		borderWidth: 2,
		padding: 2,
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
});
