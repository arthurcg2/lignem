/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import {
	View,
	Button,
	Text,
	StyleSheet,
	AccessibilityInfo,
	Animated,
} from 'react-native';
import { Overlay } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';

import Chooser from './Chooser';
import Stats from './Stats';

import trees from './trees';

const endStatements = [
	'a sustentabilidade',
	'sua popularidade',
	'suas finanças',
	'sua reserva de energia',
];

const GameMain = ({ navigation }) => {
	const [stats, setStats] = useState(new Array(4).fill(0));
	const [oldValues, setOldValues] = useState(new Array(4).fill(0));

	const [overlayVisible, setOverlayVisible] = useState(false);
	const [overlayText, setOverlayText] = useState('');

	const randNum = Math.floor(Math.random() * trees.length);
	const [currentTree, setCurrentTree] = useState(trees[randNum]);
	const [currentTreeIndex, setCurrentTreeIndex] = useState(randNum);
	const [month, setMonth] = useState(0);

	const theme = useTheme();

	const gameStats = [
		{
			name: 'Sustentabilidade',
			icon: 'leaf',
			value: stats[0],
			maxValue: 20,
		},
		{
			name: 'Popularidade',
			icon: 'group',
			value: stats[1],
			maxValue: 20,
		},
		{
			name: 'Finanças',
			icon: 'dollar',
			value: stats[2],
			maxValue: 20,
		},
		{
			name: 'Energia',
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

		AccessibilityInfo.announceForAccessibility(
			'Página do jogo. Para mais informações, abra o tutorial do jogo no canto superior direito da tela.',
		);
	}, []);

	function checkEnd(questionCount, sts) {
		if (sts.includes(0) && !oldValues.includes(0)) {
			setOverlayVisible(true);
			let i = 0;
			for (i = 0; sts[i] != 0; i++);
			setOverlayText(
				`Fim de jogo. Você não soube administrar ${
					endStatements[i]
				} e terá que sair já do poder!`,
			);
			return true;
		}
		if (questionCount >= currentTree.length - 1) {
			setOverlayVisible(true);
			setOverlayText(`Parabéns! Você chegou ao fim do seu mandato!`);
			return true;
		}
		return false;
	}

	function updateTree(not = -1) {
		let rand = Math.floor(Math.random() * trees.length);
		if (not != -1) {
			while (rand === not) {
				rand = Math.floor(Math.random() * trees.length);
			}
		}
		setCurrentTreeIndex(rand);
		setCurrentTree(trees[rand]);
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
		setMonth(month + 1);
		setStats(newStats);
		console.log(newStats);
		return checkEnd(questionCount, newStats);
	}

	function formatMonths() {
		let s = '';
		s =
			(month >= 12 ? Math.floor(month / 12) + ' ano' : '') +
			(Math.floor(month / 12) != 1 && month >= 12 ? 's' : '') +
			(month >= 12 && month % 12 != 0 ? ' e ' : '') +
			(month % 12 != 0 || month == 0
				? (month % 12) + ' ' + (month % 12 == 1 ? 'mês' : 'meses')
				: '');
		return s;
	}

	function media() {
		let sum = 0;
		for (let i = 0; i < gameStats.length; i++) {
			sum += (gameStats[i].value * 100) / gameStats[i].maxValue;
		}
		return Math.floor(sum / gameStats.length);
	}

	const m = new Animated.Value(media());

	return (
		<View
			style={[
				styles.container,
				{
					backgroundColor: theme.dark
						? theme.colors.backgroundDarken
						: theme.colors.background,
				},
			]}
		>
			<Overlay
				isVisible={overlayVisible}
				overlayBackgroundColor={theme.colors.background}
				height={350}
				width={300}
			>
				<View style={styles.overlayContainer}>
					<Text style={[styles.text, { color: theme.colors.text }]}>
						{overlayText}
					</Text>
					<Text style={{ fontSize: 18, color: theme.colors.text }}>
						Tempo de governo: {formatMonths()}
					</Text>
					{gameStats.map((stat, index) => {
						const v = new Animated.Value(stat.value);

						return (
							<View
								key={index}
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									paddingLeft: 10,
								}}
							>
								<Text style={{ color: theme.colors.text }}>{stat.name}: </Text>
								<Animated.Text
									style={{
										color: v.interpolate({
											inputRange: [0, stat.maxValue / 2, stat.maxValue],
											outputRange: [
												'rgb(255, 0, 0)',
												'rgb(230, 205, 126)',
												'rgb(0, 255, 0)',
											],
											extrapolate: 'clamp',
										}),
										fontWeight: 'bold',
									}}
								>
									{(stat.value * 100) / stat.maxValue}%
								</Animated.Text>
							</View>
						);
					})}
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							paddingLeft: 5,
						}}
					>
						<Text style={{ fontSize: 16, color: theme.colors.text }}>
							Média final:{' '}
						</Text>
						<Animated.Text
							style={{
								color: m.interpolate({
									inputRange: [0, 50, 100],
									outputRange: [
										'rgb(255, 0, 0)',
										'rgb(230, 205, 126)',
										'rgb(0, 255, 0)',
									],
									extrapolate: 'clamp',
								}),
								fontWeight: 'bold',
								fontSize: 16,
							}}
						>
							{media()}%
						</Animated.Text>
					</View>
					<Button
						title="Reiniciar"
						color={theme.colors.primary}
						style={styles.button}
						onPress={() => {
							let newStats = new Array(gameStats.length).fill(0);
							for (let i = 0; i < gameStats.length; i++) {
								newStats[i] = gameStats[i].maxValue / 2;
							}

							setCurrentTree(trees[currentTreeIndex]);
							setStats(newStats);
							setMonth(0);
							setOverlayVisible(false);
						}}
					/>
					{/* <Button
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
							setMonth(0)
							setOverlayVisible(false);
						}}
					/> */}
				</View>
			</Overlay>
			<Chooser onQuestionAnswered={handleQuestionAnswered} tree={currentTree} />
			<Text style={[styles.monthsText, { color: theme.colors.text }]}>
				Tempo de governo: {formatMonths()}
			</Text>
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
	monthsText: {
		fontSize: 14,
		marginVertical: 5,
		fontFamily: 'Montserrat',
	},
	overlayContainer: {
		flex: 1,
		justifyContent: 'space-between',
	},
});

export default GameMain;
