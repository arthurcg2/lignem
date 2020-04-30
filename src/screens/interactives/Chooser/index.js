import React, { useState, useEffect, forwardRef } from 'react';
import { Animated, Text, Image, View, TouchableOpacity } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';

import questions from '../questions';
import Card from '../Card';

import backgroundImage from '../../../../assets/game/background.png';

const Chooser = forwardRef((props, ref) => {
	const {
		isScreenReaderEnabled,
		isMotorAccessibilityEnabled,
		onNewQuestion,
		onQuestionAnswered,
		tree,
	} = props;
	const [currentQuestion, setCurrentQuestion] = useState(
		questions[tree[0].id - 1],
	);
	const [questionCount, setQuestionCount] = useState(0);
	const [answers, setAnswers] = useState(new Array(tree.length).fill(null));
	const [isFinal, setIsFinal] = useState(false);
	let n = 0;

	const [info, setInfo] = useState('');
	const elevationBrand = new Animated.Value(10);
	const elevationSwap = new Animated.Value(20);
	const changeableDist = 50;
	const translateX = new Animated.Value(0);
	const agent = {
		pop: 'A População',
		car: 'Carlos Joaquim\nMinistro da Economia',
		jon: 'Jonathan Augusto\nRepresentante da ONG Salve o Planeta',
		rob: 'Roberto Silvério\nMinistro da Energia',
		rog: 'Rogério Santos\ndono da empresa Mais Energia',
		igo: 'Igor Martins\nCientista e Pesquisador',
	};

	useEffect(() => {
		if (info != '') onNewQuestion();
		setInfo(agent[currentQuestion.char]);
	}, [currentQuestion]);

	useEffect(() => {
		if (questionCount <= tree.length - 1) updateQuestion();
		else onQuestionAnswered([0, 0, 0, 0], questionCount, false);
	}, [questionCount]);

	useEffect(() => {
		setCurrentQuestion(questions[tree[questionCount].id - 1]);
		setAnswers(new Array(tree.length).fill(null));
	}, [tree]);

	function updateQuestion() {
		setCurrentQuestion(questions[tree[questionCount].id - 1]);

		if (tree[questionCount].condition) {
			let cond = tree[questionCount].condition;
			if (answers[findInTree(cond.qIndex)] != cond.qAnswer) {
				if (cond.elseDo == 'jump') {
					setQuestionCount(questionCount + 1);
				} else {
					setCurrentQuestion(questions[cond.elseDo - 1]);
				}
			}
		}
	}

	function findQuestion(id) {
		for (let i = 0; i < questions.length; i++) {
			if (questions[i].id == id) return i;
		}
		return -1;
	}

	function findInTree(id) {
		for (let i = 0; i < tree.length; i++) {
			if (tree[i].id == id) return i;
		}
		return -1;
	}

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

	const changeQuestion = option => {
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

			let ans = answers;
			ans[questionCount] = option == 'yes' ? true : false;
			setAnswers(ans);
			n = onQuestionAnswered(currentQuestion[option], questionCount, isFinal);
			if (n == 0 && isFinal == true) {
				setIsFinal(false);
				setQuestionCount(0);
			} else if (n != 0 && isFinal == false) {
				setCurrentQuestion(questions[findQuestion(n)]);
				setIsFinal(true);
			} else {
				setQuestionCount(questionCount + 1);
			}
		}, 300);
	};

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

			if (changed) changeQuestion(option);

			Animated.timing(translateX, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true,
			}).start();
		}
	};

	return (
		<>
			{!isScreenReaderEnabled && !isMotorAccessibilityEnabled && (
				<PanGestureHandler
					onGestureEvent={animatedEvent}
					onHandlerStateChange={onHandlerStateChanged}
				>
					<Animated.View
						style={styles.container}
						importantForAccessibility="no-hide-descendants"
					>
						<Animated.View
							style={{
								elevation: elevationBrand.interpolate({
									inputRange: [10, 20],
									outputRange: [10, 20],
									extrapolate: 'clamp',
								}),
								...styles.brand,
							}}
						>
							<Image
								borderRadius={10}
								source={backgroundImage}
								style={styles.image}
							/>
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
							<Animated.View
								style={{
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
								<Text style={styles.optionText}>
									{currentQuestion.yesOption}
								</Text>
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
								<Text style={styles.optionText}>
									{currentQuestion.noOption}
								</Text>
							</Animated.View>
						</Animated.View>
					</Animated.View>
				</PanGestureHandler>
			)}
			{isScreenReaderEnabled && (
				<View style={styles.accessibilityButtonsContainer}>
					<TouchableOpacity
						accessibilityLabel={`Esquerda,\n você diz: ${
							currentQuestion.noOption
						}`}
						style={{
							...styles.accessibilityButton,
							backgroundColor: 'red',
							borderTopRightRadius: 0,
							borderBottomRightRadius: 0,
							paddingRight: 10,
						}}
						onPress={() => changeQuestion('no')}
					>
						<Icon name="cancel" size={50} color="white" />
					</TouchableOpacity>
					<TouchableOpacity
						ref={ref}
						style={styles.centerAccessibilityButton}
						accessible
						accessibilityLabel={`${agent[currentQuestion.char]} diz:\n ${
							currentQuestion.statement
						}\n ${
							isFinal
								? 'Fim de jogo, toque em qualquer uma das laterais para responder.'
								: 'Clique abaixo para ver o estado atual de seus atributos!\nClique nas laterais centrais para tomar uma decisão!'
						}`}
					>
						<Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
							{agent[currentQuestion.char]}
						</Text>
						<Text style={{ textAlign: 'center' }}>
							{currentQuestion.statement}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						accessibilityLabel={`Direita,\n você diz: ${
							currentQuestion.yesOption
						}`}
						style={{
							...styles.accessibilityButton,
							backgroundColor: 'green',
							borderTopLeftRadius: 0,
							borderBottomLeftRadius: 0,
							paddingLeft: 10,
						}}
						onPress={() => changeQuestion('yes')}
					>
						<Icon name="check-circle" size={50} color="white" />
					</TouchableOpacity>
				</View>
			)}
			{!isScreenReaderEnabled && isMotorAccessibilityEnabled && (
				<View style={styles.accessibilityButtonsContainer}>
					<TouchableOpacity
						accessibilityLabel={`Esquerda,\n você diz: ${
							currentQuestion.noOption
						}`}
						style={{
							...styles.accessibilityButton,
							backgroundColor: 'red',
							borderTopRightRadius: 0,
							borderBottomRightRadius: 0,
							paddingRight: 10,
						}}
						onPress={() => changeQuestion('no')}
					>
						<Icon name="cancel" size={50} color="white" />
					</TouchableOpacity>
					<View
						style={styles.centerMotorAccessibilityButton}
						accessible
						accessibilityLabel={`${agent[currentQuestion.char]} diz:\n ${
							currentQuestion.statement
						}\n ${
							isFinal
								? 'Fim de jogo, toque em qualquer uma das laterais para responder.'
								: 'Clique abaixo para ver o estado atual de seus atributos!\nClique nas laterais centrais para tomar uma decisão!'
						}`}
					>
						<Card
							text={currentQuestion.statement}
							character={currentQuestion.char}
							borderRadius={0}
						/>
						<Animated.View style={styles.infoContainer}>
							<Text style={styles.info}>{info}</Text>
						</Animated.View>
					</View>
					<TouchableOpacity
						accessibilityLabel={`Direita,\n você diz: ${
							currentQuestion.yesOption
						}`}
						style={{
							...styles.accessibilityButton,
							backgroundColor: 'green',
							borderTopLeftRadius: 0,
							borderBottomLeftRadius: 0,
							paddingLeft: 10,
						}}
						onPress={() => changeQuestion('yes')}
					>
						<Icon name="check-circle" size={50} color="white" />
					</TouchableOpacity>
				</View>
			)}
		</>
	);
});

export default Chooser;
