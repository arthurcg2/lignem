/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Draggable from 'react-native-draggable';

import Logo from '../../components/Logo';

const InterativoMain = () => {
	const dragSize = Dimensions.get('window').width - 100;
	const stableY = 50;
	const stableX = -40;
	const [color, setColor] = useState('#ebe3cc');
	const [score, setScore] = useState(0);

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
	const [cont, setCont] = useState(questions.length);

	const [questionStack, setQuestionStack] = useState(shuffle(questions));

	const changeableDist = 47;
	var startX = 0;

	const [questionTitle, setQuestTitle] = useState(
		questionStack[questionStack.length - 1].statement,
	);

	//console.log(questionStack);

	function progress(modifiedX) {
		setTimeout(() => setColor('#ebe3cc'), 250);
		if (modifiedX - startX > changeableDist) {
			setScore(score + 100);
			setColor('green');
		} else if (modifiedX - startX < changeableDist * -1) {
			score > 0 ? setScore(score - 100) : null;
			setColor('red');
		} else {
			return;
		}
		if (cont === 0) {
			setQuestTitle('Acabou as perguntas.');
		} else {
			setQuestTitle(questionStack[questionStack.length - 1].statement);
			setCont(cont - 1);
		}
	}

	return (
		<View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
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
					if (cont > 1) {
						setQuestionStack(questionStack.slice(0, -1));
					}
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
			<Text style={{ fontSize: 60 }}>{score}</Text>
			<Text style={{ marginBottom: 40, fontSize: 30 }}>SCORE</Text>
		</View>
	);
};

InterativoMain.navigationOptions = {
	headerTitle: <Logo />,
};

export default InterativoMain;
