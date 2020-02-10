/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';

import { View, StyleSheet } from 'react-native';
import Logo from '../../components/Logo';

import Chooser from './Chooser';
import Stats from './Stats';

const GameMain = () => {
	const [stats, setStats] = useState(new Array(4).fill(10));

	function handleQuestionAnswered(optionStats) {
		let newStats = new Array(4).fill(0);
		newStats.map((stat, i) => {
			const sum = stats[i] + optionStats[i];

			if (sum > 20) newStats[i] = 20;
			else if (sum < 0) newStats[i] = 0;
			else newStats[i] = sum;
		});
		setStats(newStats);
	}

	return (
		<View style={styles.container}>
			<Chooser onQuestionAnswered={handleQuestionAnswered} />
			<Stats currentStats={stats} />
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
