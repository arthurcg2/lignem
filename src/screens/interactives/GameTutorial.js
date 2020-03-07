import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Image, StatusBar } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const GameTutorial = ({ navigation }) => {
	const [styles, setStyles] = useState({});
	const [current, setCurrent] = useState(0);
	const theme = useTheme();

	useEffect(() => {
		setStyles(generateStyles(theme));

		const parent = navigation.dangerouslyGetParent();
		parent.setOptions({
			tabBarVisible: false,
		});
		return () =>
			parent.setOptions({
				tabBarVisible: true,
			});
	}, []);

	const onEnd = async () => {
		try {
			await AsyncStorage.setItem('isGameTutorialDone', 'true');
		} catch (err) {
			console.error('Erro ao salvar estado do gameTutorial: ' + err);
		}
		navigation.navigate('Game');
	};

	return (
		<>
			<StatusBar
				barStyle="light-content"
				backgroundColor={theme.colors.primary}
			/>
			<Onboarding
				pages={[
					{
						backgroundColor: theme.colors.primary,
						image: (
							<Image
								source={require('../../../assets/tutorial/lignem_small_white.png')}
							/>
						),
						title: (
							<Text style={styles.text}>
								Bem-vindo ao <Text style={styles.bold}>Governors</Text>!
							</Text>
						),
						subtitle:
							'Um jogo de escolhas feito para exercitar seus conhecimentos sobre métodos de geração de energia.',
						subTitleStyles: { color: theme.colors.background },
					},
					{
						backgroundColor: theme.colors.primary,
						image: (
							<Image
								source={require('../../../assets/tutorial/lignem_small_white.png')}
							/>
						),
						title: (
							<Text style={styles.text}>
								Faça <Text style={styles.bold}>escolhas</Text>
							</Text>
						),
						subtitle:
							'Arraste o quadrado central para a esquerda para rejeitar e para a direita para aceitar a proposta da pergunta. Cada escolha terá suas próprias consequências.',
						subTitleStyles: { color: theme.colors.background },
					},
					{
						backgroundColor: theme.colors.primary,
						image: (
							<Image
								source={require('../../../assets/tutorial/lignem_small_white.png')}
							/>
						),
						title: (
							<Text style={styles.text}>
								Administre seus <Text style={styles.bold}>atributos</Text>
							</Text>
						),
						subtitle:
							'Há quatro atributos: sustentabilidade, popularidade, finanças e energia. Cada escolha pode afetar cada um deles, seja de maneira positiva ou negativa.',
						subTitleStyles: { color: theme.colors.background },
					},
					{
						backgroundColor: theme.colors.primary,
						image: (
							<Image
								source={require('../../../assets/tutorial/lignem_small_white.png')}
							/>
						),
						title: (
							<Text style={styles.text}>
								Tenha <Text style={styles.bold}>cuidado</Text> em cada escolha!
							</Text>
						),
						subtitle:
							'Quando algum de seus atributos chegar a 0, você perderá. Portanto, seja cauteloso!',
						subTitleStyles: { color: theme.colors.background },
					},
					{
						backgroundColor: theme.colors.primary,
						image: (
							<Image
								source={require('../../../assets/tutorial/lignem_small_white.png')}
							/>
						),
						title: (
							<Text style={styles.text}>
								<Text style={styles.bold}>Importante</Text>!
							</Text>
						),
						subtitle:
							'Nenhum nome/localização utilizada nesse jogo é real. Qualquer semelhança é mera coincidência.',
						subTitleStyles: { color: theme.colors.background },
					},
				]}
				nextLabel={'Próximo'}
				skipLabel={'Anterior'}
				pageIndexCallback={index => {
					setCurrent(index);
					console.log(index);
				}}
				onDone={onEnd}
				showSkip={current > 0}
				skipToPage={current - 1}
			/>
		</>
	);
};

const generateStyles = theme => {
	return StyleSheet.create({
		text: {
			fontSize: 24,
			color: theme.colors.background,
		},
		bold: {
			fontSize: 24,
			color: theme.colors.background,
			fontWeight: 'bold',
		},
	});
};

export default GameTutorial;
