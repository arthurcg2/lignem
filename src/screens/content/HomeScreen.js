import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import Logo from '../../components/Logo';
import { useThemeValue } from '../../states/ThemeState';

const cards = [
	{
		id: 1,
		title: 'Exemplo',
		image: require('../../../assets/hidreletrica.jpg'),
		description:
			'Exercitation officia exercitation anim nostrud aliqua aliquip qui anim.',
		buttonTitle: 'Ir para a página!',
		targetPageSettings: {
			contentJSONName: 'teste',
			contentPageTitle: 'Teste!',
		},
	},
];

const Home = ({ navigation }) => {
	const [{ theme }] = useThemeValue();
	const [styles, setStyles] = useState({});

	useEffect(() => {
		setStyles(generateStyles(theme));
	}, [theme]);

	return (
		<View style={styles.container}>
			<ScrollView style={styles.cardsList}>
				{cards.map(card => (
					<Card
						image={card.image}
						title={card.title}
						titleStyle={styles.title}
						key={card.id}
					>
						<Text style={styles.description}>{card.description}</Text>
						<Button
							title={card.buttonTitle}
							color={theme.foreground}
							style={styles.button}
							onPress={() => {
								console.log(card.targetPageSettings);
								navigation.navigate('Content', {
									contentJSONName: card.targetPageSettings.contentJSONName,
									contentPageTitle: card.targetPageSettings.contentPageTitle,
								});
							}}
						/>
					</Card>
				))}
			</ScrollView>
		</View>
	);
};

Home.navigationOptions = {
	headerTitle: <Logo />,
};

const generateStyles = theme => {
	return StyleSheet.create({
		container: {
			backgroundColor: theme.background,
		},
		cardsList: {
			marginVertical: 10,
		},
		button: {
			fontWeight: 'bold',
		},
		description: {
			color: '#555',
			marginBottom: 10,
		},
		title: {
			color: theme.foreground,
		},
	});
};

export default Home;
