/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import { View, Button, Text, StyleSheet } from 'react-native';
import { Overlay } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import Chooser from './Chooser';
import Stats from './Stats';

const GameMain = ({ navigation }) => {
	const trees = [
		[
			{
				id: 1,
				answered: false,
			},
			{
				id: 1,
				answered: false,
			},
			{
				id: 1,
				answered: false,
			},
			{
				id: 1,
				answered: false,
			},
		],
		[
			{
				id: 2,
				answered: false,
			},
			{
				id: 2,
				answered: false,
			},
			{
				id: 2,
				answered: false,
			},
			{
				id: 2,
				answered: false,
			},
		],
		[
			{
				id: 3,
				answered: false,
			},
			{
				id: 3,
				answered: false,
			},
			{
				id: 3,
				answered: false,
			},
			{
				id: 3,
				answered: false,
			},
		],
	]

	const [stats, setStats] = useState(new Array(4).fill(0));
	const [oldValues, setOldValues] = useState(new Array(4).fill(0));

	const [overlayVisible, setOverlayVisible] = useState(false);
	const [overlayText, setOverlayText] = useState("")

	const randNum = Math.floor(Math.random() * trees.length)
	const [currentTree, setCurrentTree] = useState(trees[randNum])
	const [currentTreeIndex, setCurrentTreeIndex] = useState(randNum)

	const theme = useTheme();

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
		const loadData = async () => {
			const str = await AsyncStorage.getItem('isGameTutorialDone');
			if (str !== 'true') navigation.navigate('Tutorial');
		};
		loadData();

		let newStats = new Array(gameStats.length).fill(0);
		for (let i = 0; i < gameStats.length; i++) {
			newStats[i] = gameStats[i].maxValue / 2;
		}
		setStats(newStats);
	}, []);

	function checkEnd(questionCount, sts){
		if (sts.includes(0) && !oldValues.includes(0)) {
			setOverlayVisible(true);
			setOverlayText(`Você perdeu!\nDias de governo: ${questionCount + 1}`)
			return true
		}
		if(questionCount >= currentTree.length - 1){
			setOverlayVisible(true)
			setOverlayText(`Você ganhou! Parabéns!\nDias de governo: ${questionCount + 1}`)
			return true
		}
		return false
	}

	function updateTree(not = -1){
		let rand = Math.floor(Math.random() * trees.length)
		if(not != -1){
			while(rand === not){
				rand = Math.floor(Math.random() * trees.length)
			}
		}
		setCurrentTreeIndex(rand)
		setCurrentTree(trees[rand])
	}

	function handleQuestionAnswered(optionStats, questionCount) {
		let newStats = new Array(4).fill(0);
		setOldValues(stats);
		newStats.map((stat, i) => {
			const sum = stats[i] + optionStats[i];

			if (sum > gameStats[i].maxValue) newStats[i] = gameStats[i].maxValue;
			else if (sum < 0) newStats[i] = 0;
			else newStats[i] = sum;
		});
		setStats(newStats);
		return checkEnd(questionCount, newStats)
	}

	return (
		<View style={styles.container}>
			<Overlay isVisible={overlayVisible} height={170} width={300}>
				<View style={styles.overlayContainer}>
					<Text style={styles.text}>{overlayText}</Text>
					<Button
						title="Reiniciar com mesma árvore"
						color={theme.colors.primary}
						style={styles.button}
						onPress={() => {
							let newStats = new Array(gameStats.length).fill(0);
							for (let i = 0; i < gameStats.length; i++) {
								newStats[i] = gameStats[i].maxValue / 2;
							}

							setCurrentTree(trees[currentTreeIndex])
							setStats(newStats);
							setOverlayVisible(false);
						}}
					/>
					<Button
						title="Reiniciar com árvore diferente"
						color={theme.colors.primary}
						style={styles.button}
						onPress={() => {
							let newStats = new Array(gameStats.length).fill(0);
							for (let i = 0; i < gameStats.length; i++) {
								newStats[i] = gameStats[i].maxValue / 2;
							}

							updateTree(currentTreeIndex)
							setStats(newStats);
							setOverlayVisible(false);
						}}
					/>
				</View>
			</Overlay>
			<Chooser onQuestionAnswered={handleQuestionAnswered} tree={currentTree} />
			<Stats currentStats={gameStats} oldValues={oldValues} />
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
	button: {
		fontWeight: 'bold',
	},
	text: {
		fontSize: 24,
	},
	overlayContainer: {
		flex: 1,
		justifyContent: 'space-between',
	},
});

export default GameMain;
