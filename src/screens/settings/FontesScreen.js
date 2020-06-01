import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import fontes from '../../../contents/fontes';
import { useTheme } from '@react-navigation/native';

const Fontes = () => {
	const theme = useTheme();

	return (
		<ScrollView style={{ backgroundColor: theme.colors.background }}>
			{fontes.map((item, i) => (
				<View key={i} style={[styles.section, { marginTop: i == 0 ? 10 : 0 }]}>
					<Text
						accessible
						accessibilityLabel={`Fontes do conteúdo de ${item.content}`}
						style={[styles.title, { color: theme.colors.primary }]}
					>
						{item.content}
					</Text>
					{item.fonts.map((font, i) => (
						<View key={i}>
							<Text
								accessible
								accessibilityLabel={`Site: ${font.site}`}
								style={[
									styles.fontes,
									{
										color: theme.colors.text,
										paddingBottom: i == item.fonts.length - 1 ? 20 : 3,
									},
								]}
								onPress={() => Linking.openURL(font.url)}
							>
								{font.site}
							</Text>
						</View>
					))}
				</View>
			))}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: 25,
		fontWeight: 'bold',
		paddingBottom: 5,
		paddingTop: 15,
	},
	fontes: {
		fontSize: 17,
	},
	section: {
		marginBottom: 10,
		paddingHorizontal: 12,
		elevation: 3,
		borderRadius: 0,
	},
});

export default Fontes;
