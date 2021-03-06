import React, { useState, useEffect, useRef } from 'react';
import {
	Text,
	StyleSheet,
	Image,
	StatusBar,
	Dimensions,
	AccessibilityInfo,
	findNodeHandle,
} from 'react-native';
import {
	hideNavigationBar,
	showNavigationBar,
} from 'react-native-navigation-bar-color';

import Onboarding from 'react-native-onboarding-swiper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import { widthPercentToDP, heightPercentToDP } from '../../utils/dimensionsFunctions'

const GameTutorial = ({ navigation }) => {
	const initialElement = useRef(null);
	const [styles, setStyles] = useState({});
	const [current, setCurrent] = useState(0);
	const theme = useTheme();

	useEffect(() => {
		hideNavigationBar();
		setStyles(generateStyles(theme));
		AccessibilityInfo.setAccessibilityFocus(
			findNodeHandle(initialElement.current),
		);

		const parent = navigation.dangerouslyGetParent();
		parent.setOptions({
			tabBarVisible: false,
		});
		return () => {
			showNavigationBar();
			parent.setOptions({
				tabBarVisible: true,
			});
		};
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
								source={require('../../../assets/tutorial/lignem_white.png')}
								style={styles.image}
							/>
						),
						title: (
							<Text style={styles.text} ref={initialElement}>
								Bem-vindo ao <Text style={styles.bold}>Governors</Text>!
							</Text>
						),
						subtitle:
							'Um jogo de escolhas feito para exercitar seus conhecimentos sobre métodos de geração de energia.',
						subTitleStyles: { color: theme.colors.background },
					},
					{
						backgroundColor: theme.colors.primary,
						image: <Image 
							source={require('../../../assets/tutorial/tg-1.jpg')}
							style={styles.image}
						/>,
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
						image: <Image 
							source={require('../../../assets/tutorial/tg-2.jpg')}
							style={styles.image}
						/>,
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
						image: <Image 
							source={require('../../../assets/tutorial/tg-3.jpg')}
							style={styles.image}
						/>,
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
						image: <Image 
							source={require('../../../assets/tutorial/tg-4.jpg')}
							style={styles.image}
						/>,
						title: (
							<Text style={styles.text}>
								Ações para <Text style={styles.bold}>acessibilidade</Text>
							</Text>
						),
						subtitle:
							'Caso estiver usando um leitor de tela, clique nos botões localizados na direita e na esquerda da parte central da tela para fazer suas escolhas. Isso deixará sua experiência mais prática.',
						subTitleStyles: { color: theme.colors.background },
					},
					{
						backgroundColor: theme.colors.primary,
						image: <Image
							style={styles.image}
							source={require('../../../assets/tutorial/lignem_white.png')}
						/>,
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
				NextButtonComponent={props => (
					<Icon
						accessibilityLabel="Ir para a próxima página do tutorial."
						name="chevron-right"
						size={32}
						color={theme.colors.background}
						style={{ right: 15 }}
						{...props}
					/>
				)}
				SkipButtonComponent={props => (
					<Icon
						accessibilityLabel="Voltar para a última página do tutorial."
						name="chevron-left"
						size={32}
						color={theme.colors.background}
						style={{ left: 15 }}
						{...props}
					/>
				)}
				pageIndexCallback={index => {
					setCurrent(index);
				}}
				DoneButtonComponent={props => (
					<Icon
						accessibilityLabel="Fechar o tutorial."
						name="done"
						size={32}
						color={theme.colors.background}
						style={{ marginRight: 15 }}
						{...props}
					/>
				)}
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
		image: {
			height: heightPercentToDP('55%'), 
			width: widthPercentToDP('70%'), 
			resizeMode: 'contain'
		},
	});
};

export default GameTutorial;
