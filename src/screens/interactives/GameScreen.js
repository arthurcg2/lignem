/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import {
	View,
	Button,
	Text,
	StyleSheet,
	AccessibilityInfo,
	Animated,
	findNodeHandle,
	Image,
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
	const [isScreenReaderEnabled, setScreenReaderEnabled] = useState(false);
	const gameAccessibilityRef = useRef(null);

	const [overlayVisible, setOverlayVisible] = useState(false);
	const [overlayTitle, setOverlayTitle] = useState('');
	const [overlayText, setOverlayText] = useState('');
	const [overlayImg, setOverlayImg] = useState();

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
			image: require('../../../assets/game/end/sustentabilidade-end.png'),
			winImage: require('../../../assets/game/end/sustentabilidade-win.png'),
		},
		{
			name: 'Popularidade',
			icon: 'group',
			value: stats[1],
			maxValue: 20,
			image: require('../../../assets/game/end/popularidade-end.png'),
			winImage: require('../../../assets/game/end/popularidade-win.png'),
		},
		{
			name: 'Finanças',
			icon: 'dollar',
			value: stats[2],
			maxValue: 20,
			image: require('../../../assets/game/end/finanças-end.png'),
			winImage: require('../../../assets/game/end/finanças-win.png'),
		},
		{
			name: 'Energia',
			icon: 'bolt',
			value: stats[3],
			maxValue: 20,
			image: require('../../../assets/game/end/energia-end.png'),
			winImage: require('../../../assets/game/end/energia-win.png'),
		},
	];

	useEffect(() => {
		const checkScreenReader = async () => {
			const isEnabled = await AccessibilityInfo.isScreenReaderEnabled();
			setScreenReaderEnabled(isEnabled);
		};

		const loadData = async () => {
			const str = await AsyncStorage.getItem('isGameTutorialDone');
			if (str !== 'true') navigation.navigate('Tutorial');
		};

		loadData();
		checkScreenReader();

		let newStats = new Array(gameStats.length).fill(0);
		for (let i = 0; i < gameStats.length; i++) {
			newStats[i] = gameStats[i].maxValue / 2;
		}
		setStats(newStats);

		AccessibilityInfo.announceForAccessibility(
			'Página do jogo. Para mais informações, abra o tutorial do jogo no canto superior direito da tela.',
		);

		focusOnAccessibilityTouchable();
	}, []);

	// focar ao navegar
	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			if (gameAccessibilityRef.current) focusOnAccessibilityTouchable();
		});

		// Return the function to unsubscribe from the event so it gets removed on unmount
		return unsubscribe;
	}, [navigation]);

	function checkEnd(questionCount, sts, isFinal) {
		if (sts.includes(0) && !oldValues.includes(0)) {
			let i = 0;
			for (i = 0; sts[i] != 0; i++);
			if (!isFinal) return i * -1 - 5;
			setOverlayVisible(true);
			setOverlayTitle('Fim de jogo');
			setOverlayText(
				`Você não soube administrar ${
					endStatements[i]
				} e terá que sair já do poder!`,
			);
			setOverlayImg(gameStats[i].image);
		}
		if (questionCount >= currentTree.length - 1) {
			let maior = 0;
			for (i = 1; i < sts.length; i++) {
				if (sts[i] > sts[maior]) maior = i;
			}
			if (!isFinal) return maior * -1 - 1;
			setOverlayVisible(true);
			setOverlayImg(gameStats[maior].winImage);
			setOverlayTitle('Parabéns!');
			setOverlayText(
				`Você chegou ao fim do seu mandato, e soube melhor administrar ${
					endStatements[maior]
				}!`,
			);
		}
		return 0;
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

	function handleQuestionAnswered(optionStats, questionCount, isFinal) {
		let newStats = new Array(4).fill(0);
		newStats.map((stat, i) => {
			const sum = stats[i] + optionStats[i];

			if (sum > gameStats[i].maxValue) newStats[i] = gameStats[i].maxValue;
			else if (sum < 0) newStats[i] = 0;
			else newStats[i] = sum;
		});
		if (!isFinal) {
			setMonth(month + 1);
			setOldValues(stats);
			setStats(newStats);
		}
		return checkEnd(questionCount, newStats, isFinal);
	}

	function focusOnAccessibilityTouchable() {
		// focar na pergunta do centro do Chooser
		if (gameAccessibilityRef.current)
			AccessibilityInfo.setAccessibilityFocus(
				findNodeHandle(gameAccessibilityRef.current),
			);
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
				height={550}
				width={300}
			>
				<View
					style={styles.overlayContainer}
					accessible={true}
					accessibilityLabel={`
						${overlayTitle}\n
						${overlayText}\n
						Tempo de governo:\n
						${formatMonths()}\n
						Estado final dos atributos:\n
						${gameStats[0].name}: ${(stats[0] * 100) / gameStats[0].maxValue}%;\n
						${gameStats[1].name}: ${(stats[1] * 100) / gameStats[1].maxValue}%;\n
						${gameStats[2].name}: ${(stats[2] * 100) / gameStats[2].maxValue}%;\n
						${gameStats[3].name}: ${(stats[3] * 100) / gameStats[3].maxValue}%;\n
						Média final:\n
						${media()}%\n
					`}
				>
					<Text
						style={[
							styles.text,
							{
								color: theme.colors.text,
								fontWeight: 'bold',
								textAlign: 'center',
							},
						]}
					>
						{overlayTitle}
					</Text>
					<View
						style={{
							width: '100%',
							height: 300,
							borderRadius: 10,
							alignItems: 'center',
							justifyContent: 'flex-end',
							backgroundColor: '#b79732',
						}}
					>
						<Image
							source={overlayImg}
							style={{
								position: 'relative',
								width: '100%',
								height: '100%',
								borderRadius: 10,
							}}
						/>
						<View
							style={{
								width: '100%',
								alignSelf: 'flex-end',
								position: 'absolute',
								borderBottomLeftRadius: 10,
								borderBottomRightRadius: 10,
								backgroundColor: 'rgba(106, 66, 46, 0.6)',
								padding: 10,
							}}
						>
							<Text
								style={{
									textAlign: 'center',
									fontFamily: 'Montserrat',
									fontSize: 16,
									color: '#DDD',
								}}
							>
								{overlayText}
							</Text>
						</View>
					</View>
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
				</View>
			</Overlay>
			<Chooser
				isScreenReaderEnabled={isScreenReaderEnabled}
				onNewQuestion={focusOnAccessibilityTouchable}
				onQuestionAnswered={handleQuestionAnswered}
				tree={currentTree}
				ref={gameAccessibilityRef}
			/>
			{!isScreenReaderEnabled && (
				<Text style={[styles.monthsText, { color: theme.colors.text }]}>
					Tempo de governo: {formatMonths()}
				</Text>
			)}
			<Stats
				currentStats={gameStats}
				oldValues={oldValues}
				months={formatMonths()}
				containerStyle={{ flex: 1 }}
			/>
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
	mainGameContainer: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});

export default GameMain;
