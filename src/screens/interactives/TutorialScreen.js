import React from 'react'
import { Image } from 'react-native-elements'
import { Text, StyleSheet } from 'react-native'

import Onboarding from 'react-native-onboarding-swiper'

import Logo from '../../components/Logo'

const GameTutorial = ({ navigation }) => {
    return (
        <Onboarding
            pages={[
                {
                    backgroundColor: '#7159c1',
                    image: <Image source={require('../../../assets/hidreletrica.jpg')} />,
                    title: <Text style={styles.text}>Bem vindo ao <Text style={styles.bold}>Governors</Text>!</Text>,
                    subtitle: 'Não sei pq a imagem n ta indo',
                },
                {
                    backgroundColor: '#7159c1',
                    image: <Image source={require('../../../assets/hidreletrica.jpg')} />,
                    title: <Text style={styles.text}>Faça <Text style={styles.bold}>escolhas</Text></Text>,
                    subtitle: 'Arraste o quadrado centrar para a esquerda para "não" e para a direita para "sim". Cada escolha trará suas próprias consequências.',
                },
                {
                    backgroundColor: '#7159c1',
                    image: <Image source={require('../../../assets/hidreletrica.jpg')} />,
                    title: <Text style={styles.text}>Administre seus <Text style={styles.bold}>atributos</Text></Text>,
                    subtitle: 'Há quatro atributos: sustentabilidade, popularidade, finanças e energia. Cada escolha pode afetar cada um deles, seja de maneira positiva ou negativa.',
                },
                {
                    backgroundColor: '#7159c1',
                    image: <Image source={require('../../../assets/hidreletrica.jpg')} />,
                    title: <Text style={styles.text}>Leve seu <Text style={styles.bold}>estado</Text> à <Text style={styles.bold}>glória eterna</Text>!</Text>,
                    subtitle: 'Quando algum de seus atributos alcançar seu valor máximo ou mínimo, você ganhará ou perderá, respectivamente.',
                },
            ]}
            onDone={() => {
                navigation.navigate('Game')
            }}
            onSkip={() => {
                navigation.navigate('Game')
            }}
            nextLabel='Próximo'
            skipLabel='Pular'
        />
    )
}

const styles = StyleSheet.create({
    text:{
        fontSize: 24,
        color: '#fff',
    },
    bold: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    }
})

GameTutorial.navigationOptions = {
    headerTitle: <Logo />,
    
};

export default GameTutorial