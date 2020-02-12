/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';

import { View, StyleSheet } from 'react-native';
import Logo from '../../components/Logo';

import Chooser from './Chooser';
import Stats from './Stats';

const GameMain = () => {
	const [stats, setStats] = useState(new Array(4).fill(0));
	const [oldValues, setOldValues] = useState(new Array(4).fill(0));

	const gameStats = [
		{
			name: 'sustentabilidade',
			icon: 'leaf',
			value: stats[0],
			maxValue: 20,
		},
		{
			name: 'popularidade',
			icon: 'group',
			value: stats[1],
			maxValue: 20,
		},
		{
			name: 'finanças',
			icon: 'dollar',
			value: stats[2],
			maxValue: 20,
		},
		{
			name: 'energia',
			icon: 'bolt',
			value: stats[3],
			maxValue: 20,
		},
	];

	useEffect(() => {
		let newStats = new Array(gameStats.length).fill(0)
		for(let i = 0; i < gameStats.length; i++){
			newStats[i] = gameStats[i].maxValue / 2
		}
		setStats(newStats)
	}, [])

	function handleQuestionAnswered(optionStats) {
		let newStats = new Array(4).fill(0);
		setOldValues(stats)
		newStats.map((stat, i) => {
			const sum = stats[i] + optionStats[i];

			if (sum > gameStats[i].maxValue) newStats[i] = gameStats[i].maxValue;
			else if (sum < 0) newStats[i] = 0;
			else newStats[i] = sum;
		});
		setStats(newStats);
	}

	return (
		<View style={styles.container}>
			<Chooser onQuestionAnswered={handleQuestionAnswered} />
			<Stats currentStats={gameStats} oldValues={oldValues}/>
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
