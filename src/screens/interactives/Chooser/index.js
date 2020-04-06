import React, { useState } from 'react';
import { Animated, Text, Image } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { styles } from './styles';

import questions from '../questions';
import Card from '../Card';

import backgroundImage from '../../../../assets/game/background.png';
import { useEffect } from 'react';

const Chooser = ({ onQuestionAnswered, tree }) => {
	const [currentQuestion, setCurrentQuestion] = useState(questions[tree[0].id - 1]);
	const [questionCount, setQuestionCount] = useState(0)
	const [answers, setAnswers] = useState(new Array(tree.length).fill(null))

	const [info, setInfo] = useState('');
	const elevationBrand = new Animated.Value(10);
	const elevationSwap = new Animated.Value(20);
	const changeableDist = 50;
	const translateX = new Animated.Value(0);

	useEffect(() => {
		const character = currentQuestion.char
		if (character === 'pop') {
			setInfo("População")
		} else if (character === 'car') {
			setInfo("Carlos Joaquim\nMinistro da Economia")
		} else if (character === 'jon') {
			setInfo("Jonathan Augusto\nRepresentante da ONG Salve o Planeta")
		} else if (character === 'rob') {
			setInfo('Roberto Silvério\nMinistro da Energia')
		}
	}, [currentQuestion])

	useEffect(() => {
		updateQuestion()
	}, [questionCount])

	function updateQuestion() {
		setCurrentQuestion(questions[tree[questionCount].id - 1])

		if(tree[questionCount].condition){
			let cond = tree[questionCount].condition
			if(answers[cond.qIndex] == cond.qAnswer){
				if(cond.do == 'jump'){
					setQuestionCount(questionCount + 1)
				}
				else{
					setCurrentQuestion(questions[cond.do - 1])
				}
			}
		}
	}

	useEffect(() => {
		setCurrentQuestion(questions[tree[questionCount].id - 1])
		setAnswers(new Array(tree.length).fill(null))
	}, [tree])

	const animatedEvent = Animated.event(
		[
			{
				nativeEvent: {
					translationX: translateX,
				},
			},
		],
		{ useNativeDriver: true },
	);

	const onHandlerStateChanged = event => {
		let changed = false;
		const { translationX } = event.nativeEvent;
		if (event.nativeEvent.oldState === State.ACTIVE) {
			let option;
			if (translationX <= -changeableDist) {
				changed = true;
				option = 'no';
			} else if (translationX >= changeableDist) {
				changed = true;
				option = 'yes';
			}

			if (changed) {
				Animated.timing(elevationSwap, {
					toValue: 15,
					duration: 2,
					useNativeDriver: true,
				}).start();
				Animated.timing(elevationBrand, {
					toValue: 16,
					duration: 200,
					useNativeDriver: true,
				}).start();

				setTimeout(() => {
					Animated.timing(elevationSwap, {
						toValue: 20,
						duration: 250,
						useNativeDriver: true,
					}).start();
					Animated.timing(elevationBrand, {
						toValue: 10,
						duration: 250,
						useNativeDriver: true,
					}).start();

					let ans = answers
					ans[questionCount] = option == 'yes'? true : false
					setAnswers(ans)
					if(onQuestionAnswered(currentQuestion[option], questionCount)){
						setQuestionCount(0)
					}
					else{
						setQuestionCount(questionCount + 1)
					} 
				}, 300);
			}

			Animated.timing(translateX, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true,
			}).start();
		}
	};

	return (
		<PanGestureHandler
			onGestureEvent={animatedEvent}
			onHandlerStateChange={onHandlerStateChanged}
		>
			<Animated.View style={styles.container}>
				<Animated.View
					style={{
						elevation: 5,
						elevation: elevationBrand.interpolate({
							inputRange: [10, 20],
							outputRange: [10, 20],
							extrapolate: 'clamp',
						}),
						...styles.brand,
					}}
				>
					<Image borderRadius={10} source={backgroundImage} style={styles.image} />
				</Animated.View>
				<Animated.View
					style={{
						transform: [
							{
								translateX: translateX.interpolate({
									inputRange: [-450, -50, 50, 450],
									outputRange: [-75, -50, 50, 75],
									extrapolate: 'clamp',
								}),
								rotateY: translateX.interpolate({
									inputRange: [-450, -50, 0, 50, 450],
									outputRange: [-0.3, 0, 0, 0, 0.3],
									extrapolate: 'clamp',
								}),
							},
						],
						elevation: elevationSwap.interpolate({
							inputRange: [10, 20],
							outputRange: [10, 20],
							extrapolate: 'clamp',
						}),
						...styles.swap,
					}}
				>
					<Card
						text={currentQuestion.statement}
						character={currentQuestion.char}
					/>
					<Animated.View style={{
							opacity: translateX.interpolate({
								inputRange: [-40, 0, 40],
								outputRange: [0, 1, 0],
								extrapolate: 'clamp',
							}),
							...styles.infoContainer,
						}}
					>
						<Text style={styles.info}>{info}</Text>
					</Animated.View>
					<Animated.View
						style={{
							opacity: translateX.interpolate({
								inputRange: [0, 20, 70],
								outputRange: [0, 0.4, 0.8],
								extrapolate: 'clamp',
							}),
							...styles.yes,
						}}
					>
						<Text style={styles.optionText}>{currentQuestion.yesOption}</Text>
					</Animated.View>
					<Animated.View
						style={{
							opacity: translateX.interpolate({
								inputRange: [-70, -20, 0],
								outputRange: [0.8, 0.4, 0],
								extrapolate: 'clamp',
							}),
							...styles.no,
						}}
					>
						<Text style={styles.optionText}>{currentQuestion.noOption}</Text>
					</Animated.View>
				</Animated.View>
			</Animated.View>
		</PanGestureHandler>
	);
};
export default Chooser;
