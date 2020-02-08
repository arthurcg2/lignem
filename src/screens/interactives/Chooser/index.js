import React, { useEffect, useState } from 'react';
import { Animated, Text } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { styles } from './styles';

import questions from '../questions';

const Chooser = () => {
	const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
	const elevationBrand = new Animated.Value(10);
	const elevationSwap = new Animated.Value(20);
	const changeableDist = 50;
	const translateX = new Animated.Value(0);

	function updateQuestion() {
		setCurrentQuestion(questions[Math.floor(Math.random() * questions.length)]);
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

	const onHandlerStateChanged = event => {
		let changed = false;
		const { translationX } = event.nativeEvent;
		if (event.nativeEvent.oldState === State.ACTIVE) {
			if (translationX <= -changeableDist) {
				changed = true;
			} else if (translationX >= changeableDist) {
				changed = true;
			}

			if (changed) {
				Animated.timing(elevationSwap, {
					toValue: 15,
					duration: 200,
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
					updateQuestion();
				}, 450);
			}

			Animated.timing(translateX, {
				toValue: 0,
				duration: 250,
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
				/>
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
					<Text>{currentQuestion.statement}</Text>
					<Animated.View
						style={{
							opacity: translateX.interpolate({
								inputRange: [0, 20, 70],
								outputRange: [0, 0.4, 0.6],
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
								outputRange: [0.6, 0.4, 0],
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
