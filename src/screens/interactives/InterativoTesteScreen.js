/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Draggable from 'react-native-draggable';

import Logo from '../../components/Logo';

const InterativoMain = () => {
	const dragSize = Dimensions.get('window').width - 100;
	const stableY = 50;
	const stableX = -40;
	const [color, setColor] = useState('#cfbb80');
	const [score, setScore] = useState(0);
	const changeableDist = 47;

	var startX = 0;

	function prog(modifiedX) {
		setTimeout(() => setColor('#cfbb80'), 250);
		if (modifiedX - startX > changeableDist) {
			setScore(score + 100);
			setColor('green');
		} else if (modifiedX - startX < changeableDist * -1) {
			score > 0 ? setScore(score - 100) : null;
			setColor('red');
		}
	}

	return (
		<View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
			<Draggable
				renderSize={dragSize}
				renderColor={color}
				x={Dimensions.get('window').width / 2 - dragSize / 2}
				y={stableY}
				minY={stableY}
				maxY={dragSize + stableY}
				renderText=""
				shouldReverse={true}
				mstartX={stableX}
				maxX={Dimensions.get('window').width - stableX}
				onPressIn={evt => (startX = evt.nativeEvent.pageX)}
				onDragRelease={evt => prog(evt.nativeEvent.pageX)}
			/>
			<Text style={{ fontSize: 60 }}>{score}</Text>
			<Text style={{ marginBottom: 40, fontSize: 30 }}>SCORE</Text>
		</View>
	);
};

InterativoMain.navigationOptions = {
	headerTitle: <Logo />,
};

export default InterativoMain;
