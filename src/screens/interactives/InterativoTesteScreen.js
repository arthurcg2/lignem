/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native';
import Draggable from 'react-native-draggable';

import Logo from '../../components/Logo';

const InterativoMain = () => {
	const dragSize = Dimensions.get('window').width - 100;
	const stableY = 0;
	const stableX = -40;
	const [color, setColor] = useState('#ebe3cc');
	const [score, setScore] = useState(0);
	const [stats, setStats] = useState(new Array(3).fill(0));

	const questions = [
		{
			id: 1,
			statement:
				'Bolsonaro pedes para colocar uma Usina Hidrelétrica na foz do rio Amazonas. Colocas?',
		},
		{
			id: 2,
			statement:
				'Bolsonaro começa a dormir. Colocas uma termelétrica no interior de Minas?',
		},
		{
			id: 3,
			statement: 'Pgt Teste',
		},
		{
			id: 5,
			statement: 'YYYYYYYYYYYYYYYYYYYEEEEEEEEEEEEEYYYYYYYYYYYYYYY',
		},
		{
			id: 8,
			statement:
				'MMMMMMMMMMMMMMMMMMMMIIIIIIIIIIIIIIIIIIIIIIAAAAAAAAAAAAAAAAAAUUUUUUUUUUUUUUUU',
		},
		{
			id: 11,
			statement: 'Não era isso que querias Bolsonaro, uma menina pescotapa?',
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

	const changeableDist = 47;
	var startX = 0;

	const [questionTitle, setQuestTitle] = useState(questionStack[0].statement);
	const [cont, setCont] = useState(1);

	//console.log(questionStack);

	function progress(modifiedX) {
		setTimeout(() => setColor('#ebe3cc'), 250);
		if (modifiedX - startX > changeableDist) {
			stats[0] < 10
				? setStats([stats[0] + 1, stats[1] + 1, stats[2] + 1])
				: null;
			setScore(score + 100);
			setColor('green');
		} else if (modifiedX - startX < changeableDist * -1) {
			stats[0] > 0
				? setStats([stats[0] - 1, stats[1] - 1, stats[2] - 1])
				: null;
			score > 0 ? setScore(score - 100) : null;
			setColor('red');
		} else {
			return;
		}
		if (cont === questionStack.length) {
			setQuestTitle('Acabou as perguntas.');
		} else {
			setCont(cont + 1);
			setQuestTitle(questionStack[cont].statement);
		}
	}

	const MAX_STAT_VALUE = 10;

	let gameStats = [
		{
			name: 'sustentabilidade',
			icon: require('../../../assets/gameIcons/sustentabilidade_icon.png'),
			value: stats[0], // máximo: 10 (MAX_STAT_VALUE)
		},
		{
			name: 'popularidade',
			icon: require('../../../assets/gameIcons/popularidade_icon.png'),
			value: stats[1],
		},
		{
			name: 'finanças',
			icon: require('../../../assets/gameIcons/dinheiro_icon.png'),
			value: stats[2],
		},
	];

	return (
		<View style={styles.container}>
			<View style={styles.draggableContainer}>
				<Draggable
					renderColor={color}
					x={Dimensions.get('window').width / 2 - dragSize / 2}
					y={stableY}
					minY={stableY}
					maxY={dragSize + stableY}
					renderText={questionTitle}
					shouldReverse={true}
					minX={stableX}
					maxX={Dimensions.get('window').width - stableX}
					onPressIn={evt => (startX = evt.nativeEvent.pageX)}
					onDragRelease={evt => {
						progress(evt.nativeEvent.pageX);
					}}
					style={{}}
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
							elevation: 7,
							marginRight: -5,
							marginTop: -8,
							marginBottom: 3,
							marginLeft: 2,
						}}
					>
						{questionTitle}
					</Text>
				</Draggable>
			</View>
			<View style={styles.textContainer}>
				<Text style={{ ...styles.generalText, paddingTop: 22, fontSize: 30 }}>
					SCORE
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
									height: (stats[0] / MAX_STAT_VALUE) * 100 + '%',
									backgroundColor: color,
								}}
							/>
						</View>
						<Image style={styles.icon} source={stat.icon} />
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
		paddingTop: 40,
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
		color: '#7159c1',
	},
	textContainer: {
		width: '50%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
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
		padding: 2,
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	icon: {
		width: 32,
		height: 32,
	},
});

InterativoMain.navigationOptions = {
	headerTitle: <Logo />,
};

export default InterativoMain;
