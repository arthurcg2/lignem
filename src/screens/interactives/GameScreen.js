/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';

import { View, StyleSheet } from 'react-native';
import Logo from '../../components/Logo';

import Chooser from './Chooser';
import Stats from './Stats';

const GameMain = () => {
	const [statsState, setStatsState] = useState(new Array(4).fill(0));

	function handleQuestionAnswered(question, answer) {
		// setStats({stats})
	}

	return (
		<View style={styles.container}>
			<Chooser onQuestionAnswered={handleQuestionAnswered} />
			<Stats currentStats={statsState} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 25,
	},
});

GameMain.navigationOptions = {
	headerTitle: <Logo />,
};

export default GameMain;
