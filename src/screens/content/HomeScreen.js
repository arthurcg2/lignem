import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import Logo from '../../components/Logo';
import { useThemeValue } from '../../states/ThemeState';

const cards = [
	{
		id: 1,
		title: 'Usinas Hidrelétricas',
		image: require('../../../assets/hidreletrica.jpg'),
		description:
			'Conceito, funcionamento e características das usinas hidrelétricas.',
		buttonTitle: 'Ir para a página!',
		targetPageSettings: {
			contentJSONName: 'hidreletrica',
			contentPageTitle: 'Usinas Hidrelétricas',
		},
	},
	{
		id: 2,
		title: 'Energia Solar',
		image: require('../../../assets/painel-solar.jpg'),
		description:
			'A energia solar: sua definição, funcionamento e suas características!',
		buttonTitle: 'Ir para a página!',
		targetPageSettings: {
			contentJSONName: 'solar',
			contentPageTitle: 'Energia Solar',
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
