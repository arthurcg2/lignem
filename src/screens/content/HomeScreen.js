import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';

import cards from './cards';

const Home = ({ navigation }) => {
	const [styles, setStyles] = useState({});
	const theme = useTheme();

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
						containerStyle={(() => {
							const marginVal = cards[cards.length - 1] == card ? 20 : 0;

							return {
								marginBottom: marginVal,
								backgroundColor: theme.colors.background,
								borderColor: theme.colors.background,
							};
						})()}
						key={card.id}
					>
						<Text style={styles.description}>{card.description}</Text>
						<Button
							title={card.buttonTitle}
							color={theme.colors.primary}
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
			backgroundColor: theme.colors.background,
		},
		cardsList: {
			paddingTop: 10,
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
