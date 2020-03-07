import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, Text } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper';

import AsyncStorage from '@react-native-community/async-storage'
import { useTheme } from '@react-navigation/native';

const ContentTutorial = ({ navigation }) => {
    const [styles, setStyles] = useState({})
	const theme = useTheme()

	useEffect(() => {
		setStyles(generateStyles(theme))
	}, [])

    const onEnd = async () => {
        try {
            await AsyncStorage.setItem('isContentTutorialDone', 'true');
        } catch (err) {
            console.error('Erro ao salvar estado do contentTutorial: ' + err);
        }
        navigation.navigate('Home')
    }

    return (
        <Onboarding
            pages={[
                {
                    backgroundColor: theme.colors.primary,
                    image: <Image source={require('../../../assets/tutorial/lignem_small_white.png')} />,
                    title: (
						<Text style={styles.text}>
							Bem-vindo ao app <Text style={styles.bold}>Lignem</Text>!
						</Text>
					),
                    subtitle: 'Aqui você aprenderá sobre métodos de geração de energia de maneira fácil e dinâmica!',
                    subTitleStyles: {color: theme.colors.background},
                },
                {
                    backgroundColor: theme.colors.primary,
                    image: <Image source={require('../../../assets/tutorial/lignem_small_white.png')} />,
                    title: (
						<Text style={styles.text}>
							<Text style={styles.bold}>Navegação</Text>
						</Text>
					),
                    subtitle: 'Navegue pelas telas de Conteúdos, Jogo e Configurações através do menu na parte inferior.',
                    subTitleStyles: {color: theme.colors.background},
                },
                {
                    backgroundColor: theme.colors.primary,
                    image: <Image source={require('../../../assets/tutorial/lignem_small_white.png')} />,
                    title: (
						<Text style={styles.text}>
							Tela de <Text style={styles.bold}>Conteúdos</Text>
						</Text>
					),
                    subtitle: 'Aqui você encontrará diversos conteúdos para serem vistos. Basta clicar no botão "Ir para a página!" no conteúdo desejado.',
                    subTitleStyles: {color: theme.colors.background},
                },
                {
                    backgroundColor: theme.colors.primary,
                    image: <Image source={require('../../../assets/tutorial/lignem_small_white.png')} />,
                    title: (
						<Text style={styles.text}>
							Tela de <Text style={styles.bold}>Jogo</Text>
						</Text>
					),
                    subtitle: 'Nessa tela você encontrará o jogo, uma forma interativa de exercitar seus conhecimentos sobre métodos de geração de energia, onde você deve administrar seus atributos e fazer boas escolhas.',
                    subTitleStyles: {color: theme.colors.background},
                },
                {
                    backgroundColor: theme.colors.primary,
                    image: <Image source={require('../../../assets/tutorial/lignem_small_white.png')} />,
                    title: (
						<Text style={styles.text}>
							Tela de <Text style={styles.bold}>Configurações</Text>
						</Text>
					),
                    subtitle: 'Essa tela contém todas as configurações do app, além de uma página "Sobre" com mais informação a respeito o aplicativo.',
                    subTitleStyles: {color: theme.colors.background},
                },
            ]}
            nextLabel={'Próximo'}
            skipLabel={'Pular'}
            onDone={onEnd}
            onSkip={onEnd}
        />
    )
}

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
    })
}

export default ContentTutorial