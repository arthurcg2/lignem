import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Button,
	ScrollView,
	AccessibilityInfo,
} from 'react-native';
import { Card } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';

import cards from './cards';

import AsyncStorage from '@react-native-community/async-storage';

const Home = ({ navigation }) => {
	const [styles, setStyles] = useState({});
	const theme = useTheme();

	useEffect(() => {
		setStyles(generateStyles(theme));
	}, [theme]);

	useEffect(() => {
		const loadData = async () => {
			let str = await AsyncStorage.getItem('isContentTutorialDone');
			if (str !== 'true') navigation.navigate('TutorialLignem');
		};
		loadData();

		AccessibilityInfo.announceForAccessibility(
			'Página de conteúdos. Os cards estão dispostos a seguir.',
		);
	}, []);

	return (
		<View style={styles.container}>
			<ScrollView style={styles.cardsList}>
				{cards.map(card => (
					<View
						key={card.id}
						accessible
						accessibilityLabel={`Card de ${card.title}. O conteúdo aborda ${
							card.description
						}. Para acessar a página desse conteúdo, clique no botão a seguir.`}
					>
						<Card
							image={card.image}
							title={card.title}
							titleStyle={styles.title}
							containerStyle={(() => {
								const marginVal = cards[cards.length - 1] == card ? 20 : 0;

								return {
									marginBottom: marginVal,
									backgroundColor: theme.colors.background,
									borderColor: theme.colors.background,
								};
							})()}
						>
							<Text style={styles.description} importantForAccessibility="no">
								{card.description}
							</Text>
							<Button
								accessibilityLabel={`Ir para a página de conteúdo de ${
									card.title
								}`}
								title={card.buttonTitle}
								color={theme.colors.primary}
								style={styles.button}
								onPress={() => {
									navigation.navigate({
										name: 'Content',
										params: {
											contentJSONName: card.targetPageSettings.contentJSONName,
											contentPageTitle:
												card.targetPageSettings.contentPageTitle,
										},
									});
								}}
							/>
						</Card>
					</View>
				))}
			</ScrollView>
		</View>
	);
};

const generateStyles = theme => {
	return StyleSheet.create({
		container: {
			backgroundColor: theme.colors.background,
		},
		button: {
			fontWeight: 'bold',
		},
		description: {
			color: theme.colors.text,
			paddingBottom: 10,
		},
		title: {
			color: theme.colors.primary,
		},
	});
};

export default Home;
