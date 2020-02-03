/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
	View,
	Text,
	Dimensions,
	StyleSheet,
	Image,
	findNodeHandle,
} from 'react-native';
import Draggable from 'react-native-draggable';

import Icon from 'react-native-vector-icons/FontAwesome';
import questions from './questions';
import Logo from '../../components/Logo';

const GameMain = () => {
	const dragSize = Dimensions.get('window').width - 100;
	const stableY = 0;
	const stableX = 0;
	const [color, setColor] = useState('#ebe3cc');
	const [colors, setColors] = useState(new Array(4).fill('#e6cd7e'));
	const [score, setScore] = useState(0);
	const [stats, setStats] = useState(new Array(4).fill(0));

	let gameStats = [
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

	function shuffle(array) {
		var currentIndex = array.length,
			temporaryValue,
			randomIndex;

		// While there remain elements to shuffle...
		while (currentIndex !== 0) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}

	const [questionStack, setQuestionStack] = useState(shuffle(questions));

	const changeableDist = 80;
	var startX = 0;

	const [questionTitle, setQuestTitle] = useState(
		questionStack[questionStack.length - 1].statement,
	);
	const [cont, setCont] = useState(questions.length);

	function calculateScore() {
		let scr = 0;
		for (let i = 0; i < stats.length; i++) {
			scr += 20 * stats[i];
		}
		return scr;
	}

	function progress(modifiedX) {
		setTimeout(() => {
			setColor('#ebe3cc');
			let clrs = new Array(4).fill('#e6cd7e');
			for (let i = 0; i < stats.length; i++) {
				if (stats[i] > (2 * gameStats[i].maxValue) / 3) clrs[i] = '#42f55d';
				else if (stats[i] < gameStats[i].maxValue / 3) clrs[i] = '#f54242';
			}
			setColors(clrs);
		}, 250);
		let statsArr = stats;
		let colorsArr = colors;
		let values;

		if (cont !== 0) {
			if (modifiedX - startX > changeableDist) {
				values = questionStack[questionStack.length - 1].yes;
				for (let i = 0; i < gameStats.length; i++) {
					if (values[i] > 0) colorsArr[i] = 'green';
					else if (values[i] < 0) colorsArr[i] = 'red';
					statsArr[i] += values[i];
					if (statsArr[i] < 0) statsArr[i] = 0;
					if (statsArr[i] > gameStats[i].maxValue)
						statsArr[i] = gameStats[i].maxValue;
				}
				setStats(statsArr);
				setScore(calculateScore());
				setColors(colorsArr);
				setColor('green');
			} else if (modifiedX - startX < changeableDist * -1) {
				values = questionStack[questionStack.length - 1].no;
				for (let i = 0; i < gameStats.length; i++) {
					if (values[i] > 0) colorsArr[i] = 'green';
					else if (values[i] < 0) colorsArr[i] = 'red';
					statsArr[i] += values[i];
					if (statsArr[i] < 0) statsArr[i] = 0;
					if (statsArr[i] > gameStats[i].maxValue)
						statsArr[i] = gameStats[i].maxValue;
				}
				setStats(statsArr);
				setScore(calculateScore());
				setColors(colorsArr);
				setColor('red');
			} else {
				return;
			}
			if (questionStack.length > 1)
				setQuestTitle(questionStack[questionStack.length - 2].statement);
			else setQuestTitle('Acabou as perguntas.');
			setCont(cont - 1);
		}
	}
	return (
		<View style={styles.container}>
			<View style={styles.header}></View>
			<View style={styles.draggableContainer}>
				<Draggable
					renderColor={color}
					x={Dimensions.get('window').width / 2 - dragSize / 2}
					y={stableY}
					minY={stableY}
					maxY={dragSize + stableY}
					renderText={questionTitle}
					shouldReverse={true}
					minX={stableX - 40}
					maxX={Dimensions.get('window').width - stableX + 40}
					onPressIn={evt => (startX = evt.nativeEvent.pageX)}
					onDragRelease={evt => {
						progress(evt.nativeEvent.pageX);
						if (cont > 1) {
							setQuestionStack(questionStack.slice(0, -1));
						}
					}}
				>
					<Text
						style={{
							width: dragSize,
							height: dragSize,
							textAlign: 'center',
							textAlignVertical: 'center',
							fontSize: 25,
							padding: 17,
							//orderWidth: 1,
							borderRadius: 4,
							borderColor: '#000',
							//borderBottomWidth: 0,
							shadowColor: '#000',
							//shadowOffset: { width: 10, height: 20 },
							shadowOpacity: 0.8,
							//shadowRadius: 200,
						}}
					>
						{questionTitle}
					</Text>
				</Draggable>
			</View>
			<View style={styles.textContainer}>
				<Text style={{ ...styles.generalText, paddingTop: 22, fontSize: 30 }}>
					PONTUAÇÃO{' '}
				</Text>
				<Text style={{ ...styles.generalText, fontSize: 60 }}>{score}</Text>
			</View>
			<View style={styles.statsContainer}>
				{gameStats.map((stat, i) => (
					<View key={i} style={styles.stat}>
						<View style={styles.statBar}>
							<View
								style={{
									width: '100%',
									height:
										(gameStats[i].value / gameStats[i].maxValue) * 100 + '%',
									backgroundColor: colors[i],
								}}
							></View>
						</View>
						<Icon name={gameStats[i].icon} size={32} color="#6048b0" />
					</View>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	header: {
		width: '100%',
		height: 40,
	},
	draggableContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1,
		width: '100%',
		backgroundColor: '#ffeec2',
		height: Dimensions.get('window').width - 100,
	},
	generalText: {
		color: '#6048b0',
	},
	textContainer: {
		width: '50%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	statsContainer: {
		height: '25%',
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	stat: {
		width: '30%',
		height: '100%',
		alignItems: 'center',
	},
	statBar: {
		width: 30,
		height: 75,
		marginBottom: 10,
		borderWidth: 2,
		borderColor: '#6048b0',
		padding: 2,
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	greenArrow: {
		position: 'absolute',
		left: 3.5,
		bottom: 30,
		width: 0,
		height: 0,
		borderLeftWidth: 10,
		borderLeftColor: 'transparent',
		borderRightWidth: 10,
		borderRightColor: 'transparent',
		borderBottomWidth: 15,
		borderBottomColor: 'green',
	},
	redArrow: {
		position: 'absolute',
		left: 3.5,
		bottom: 30,
		width: 0,
		height: 0,
		borderLeftWidth: 10,
		borderLeftColor: 'transparent',
		borderRightWidth: 10,
		borderRightColor: 'transparent',
		borderTopWidth: 15,
		borderTopColor: 'red',
	},
});

GameMain.navigationOptions = {
	headerTitle: <Logo />,
};

export default GameMain;
