import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { useThemeValue } from '../../states/ThemeState';

import cards from './cards';

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
						containerStyle={
							cards[cards.length - 1] == card ? { marginBottom: 20 } : {}
						}
						key={card.id}
					>
						<Text style={styles.description}>{card.description}</Text>
						<Button
							title={card.buttonTitle}
							color={theme.foreground}
							style={styles.button}
							onPress={() => {
								navigation.navigate({
									name: 'Content',
									params: {
										contentJSONName: card.targetPageSettings.contentJSONName,
										contentPageTitle: card.targetPageSettings.contentPageTitle,
									},
								});
							}}
						/>
					</Card>
				))}
			</ScrollView>
		</View>
	);
};

const generateStyles = theme => {
	return StyleSheet.create({
		container: {
			backgroundColor: theme.background,
		},
		cardsList: {
			paddingTop: 10,
		},
		button: {
			fontWeight: 'bold',
		},
		description: {
			color: '#555',
			paddingBottom: 10,
		},
		title: {
			color: theme.foreground,
		},
	});
};

export default Home;
