import React, { useState, useEffect, useRef } from 'react';
import {
	Image,
	StyleSheet,
	Text,
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
import AsyncStorage from '@react-native-community/async-storage';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ContentTutorial = ({ navigation }) => {
	const initialElement = useRef(null);
	const [styles, setStyles] = useState({});
	const [current, setCurrent] = useState(0);
	const theme = useTheme();
	const isLargeScreen = Dimensions.get('window').height > 592;

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
			await AsyncStorage.setItem('isContentTutorialDone', 'true');
		} catch (err) {
			console.error('Erro ao salvar estado do contentTutorial: ' + err);
		}
		navigation.navigate('Home');
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
								Bem-vindo ao <Text style={styles.bold}>Lignem</Text>!
							</Text>
						),
						subtitle:
							'Aqui você aprenderá sobre métodos de geração de energia de maneira fácil e dinâmica!',
						subTitleStyles: { color: theme.colors.background },
					},
					{
						backgroundColor: theme.colors.primary,
						image: (() => {
							if (isLargeScreen) {
								return (
									<Image
										source={require('../../../assets/tutorial/tc-1.jpg')}
										style={{ height: 229, width: 350 }}
									/>
								);
							} else {
								return <Image />;
							}
						})(),
						title: (
							<Text style={styles.text}>
								<Text style={styles.bold}>Navegação</Text>
							</Text>
						),
						subtitle:
							'Navegue pelas telas de Conteúdos, Jogo e Configurações através do menu na parte inferior.',
						subTitleStyles: { color: theme.colors.background },
					},
					{
						backgroundColor: theme.colors.primary,
						image: (() => {
							if (isLargeScreen) {
								return (
									<Image
										source={require('../../../assets/tutorial/tc-2.jpg')}
										style={{ height: 367, width: 350 }}
									/>
								);
							} else {
								return <Image />;
							}
						})(),
						title: (
							<Text style={styles.text}>
								Tela de <Text style={styles.bold}>Conteúdos</Text>
							</Text>
						),
						subtitle:
							'Aqui você encontrará diversos conteúdos para serem vistos. Basta clicar no botão "Ir para a página!" no conteúdo desejado.',
						subTitleStyles: { color: theme.colors.background },
					},
					{
						backgroundColor: theme.colors.primary,
						image: (() => {
							if (isLargeScreen) {
								return (
									<Image
										source={require('../../../assets/tutorial/tc-3.jpg')}
										style={{ height: 221, width: 350 }}
									/>
								);
							} else {
								return <Image />;
							}
						})(),
						title: (
							<Text style={styles.text}>
								Tela de <Text style={styles.bold}>Jogo</Text>
							</Text>
						),
						subtitle:
							'Nessa tela você encontrará o jogo, uma forma interativa de exercitar seus conhecimentos sobre métodos de geração de energia, onde você deve administrar seus atributos e fazer boas escolhas.',
						subTitleStyles: { color: theme.colors.background },
					},
					{
						backgroundColor: theme.colors.primary,
						image: (() => {
							if (isLargeScreen) {
								return (
									<Image
										source={require('../../../assets/tutorial/tc-4.jpg')}
										style={{ height: 341, width: 350 }}
									/>
								);
							} else {
								return <Image />;
							}
						})(),
						title: (
							<Text style={styles.text}>
								Tela de <Text style={styles.bold}>Configurações</Text>
							</Text>
						),
						subtitle:
							'Essa tela contém todas as configurações do app, além de uma página "Sobre" com mais informação a respeito o aplicativo.',
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
						accessibilityLabel="Fechar tutorial."
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
			height: 175,
			width: 175,
		},

		imgTutorialConfig: {
			height: 500,
			width: 340,
		},
	});
};

export default ContentTutorial;
