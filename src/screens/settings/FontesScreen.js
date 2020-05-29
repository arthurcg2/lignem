import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import fontes from '../../../contents/fontes';
import { useTheme } from '@react-navigation/native';

const Fontes = () => {
	const theme = useTheme();
	return (
		<ScrollView>
			{fontes.map((item, i) => (
				<View key={i} style={styles.view}>
					<Text style={[styles.title, { color: theme.colors.text }]}>
						{item.content}
					</Text>
					{item.fonts.map((font, i) => (
						<View key={i}>
							<Text
								style={[styles.fontes, { color: theme.colors.text }]}
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
		marginLeft: 7,
		marginTop: 10,
	},
	fontes: {
		fontSize: 17,
		marginLeft: 7,
	},
	view: {
		marginBottom: 10,
	},
});

export default Fontes;
