/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Draggable from 'react-native-draggable';

import Logo from '../../components/Logo';

const InterativoMain = () => {
	const drSz = Dimensions.get('window').width - 100;
	const stY = 50;
	const stX = -40;
	const [color, setColor] = useState('#cfbb80');
	const changeableDist = 47;

	var inX = 0;

	function prog(afX) {
		setTimeout(() => setColor('#cfbb80'), 250);
		if (afX - inX > changeableDist) {
			setColor('green');
		} else if (afX - inX < changeableDist * -1) {
			setColor('red');
		}
	}

	return (
		<View style={{ position: 'relative' }}>
			<Draggable
				renderSize={drSz}
				renderColor={color}
				x={Dimensions.get('window').width / 2 - drSz / 2}
				y={stY}
				minY={stY}
				maxY={drSz + stY}
				renderText=""
				shouldReverse={true}
				minX={stX}
				maxX={Dimensions.get('window').width - stX}
				onPressIn={evt => (inX = evt.nativeEvent.pageX)}
				onDragRelease={evt => prog(evt.nativeEvent.pageX)}
			/>
		</View>
	);
};

InterativoMain.navigationOptions = {
	headerTitle: <Logo />,
};

export default InterativoMain;
