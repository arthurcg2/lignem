/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import {
	View,
	Button,
	Text,
	StyleSheet,
	AccessibilityInfo,
} from 'react-native';
import { Overlay } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import Chooser from './Chooser';
import Stats from './Stats';

const GameMain = ({ navigation }) => {
	const [stats, setStats] = useState(new Array(4).fill(0));
	const [oldValues, setOldValues] = useState(new Array(4).fill(0));
	const [overlayVisible, setOverlayVisible] = useState(false);
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

		AccessibilityInfo.announceForAccessibility(
			'Página do jogo. Para mais informações, abra o tutorial do jogo no canto superior direito da tela.',
		);
	}, []);

	useEffect(() => {
		if (stats.includes(0) && !oldValues.includes(0)) {
			// perdeu o jogo
			setOverlayVisible(true);
		}
	}, [stats]);

	function handleQuestionAnswered(optionStats) {
		let newStats = new Array(4).fill(0);
		setOldValues(stats);
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
			<Overlay
				isVisible={overlayVisible}
				height={100}
				overlayBackgroundColor={theme.colors.background}
			>
				<View
					style={[
						styles.overlayContainer,
						{ backgroundColor: theme.colors.background },
					]}
				>
					<Text style={[styles.text, { color: theme.colors.text }]}>
						Você perdeu o jogo!
					</Text>
					<Button
						title="Reiniciar!"
						color={theme.colors.primary}
						style={styles.button}
						onPress={() => {
							let newStats = new Array(gameStats.length).fill(0);
							for (let i = 0; i < gameStats.length; i++) {
								newStats[i] = gameStats[i].maxValue / 2;
							}

							setStats(newStats);
							setOverlayVisible(false);
						}}
					/>
				</View>
			</Overlay>
			<Chooser onQuestionAnswered={handleQuestionAnswered} />
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
