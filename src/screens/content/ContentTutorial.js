import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, StatusBar, Dimensions } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

import AsyncStorage from '@react-native-community/async-storage';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ContentTutorial = ({ navigation }) => {
	const [styles, setStyles] = useState({});
	const [current, setCurrent] = useState(0);
	const theme = useTheme();
	const isLargeScreen = Dimensions.get('window').height > 592;

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
							<Text style={styles.text}>
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
										source={require('../../../assets/tutorial/tc-1.png')}
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
										source={require('../../../assets/tutorial/tc-2.png')}
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
										source={require('../../../assets/tutorial/tc-3.png')}
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
										source={require('../../../assets/tutorial/tc-4.png')}
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
						name="chevron-right"
						size={32}
						color={theme.colors.background}
						style={{ right: 15 }}
						{...props}
					/>
				)}
				SkipButtonComponent={props => (
					<Icon
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
	});
};

export default ContentTutorial;
