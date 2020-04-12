import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import { ListItem, SocialIcon, Divider } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';

const Sobre = () => {
	const theme = useTheme();

	return (
		<ScrollView
			style={[styles.container, { backgroundColor: theme.colors.background }]}
		>
			<View>
				<Text style={[styles.title, { color: theme.colors.text }]}>
					Quem somos?
				</Text>
				<Text style={[styles.normalText, { color: theme.colors.text }]}>
					{'\t\t'}Nós somos a equipe{' '}
					<Text style={{ fontWeight: 'bold' }}>Lignem</Text>, finalista da
					Maratona Brasil Mais TI 2019. Nossos integrantes são do CEFET-MG. O
					aplicativo tem foco nas matérias de Geografia e Física, além de uma
					aplicação prática baseada no jogo{' '}
					<Text style={{ fontStyle: 'italic' }}>Reigns</Text>. {'\n\n'}
					Para críticas/sugestões, entre em contato:{' '}
					<Text
						style={{ textDecorationLine: 'underline' }}
						onPress={() =>
							Linking.openURL(
								'mailto:equipelignem@gmail.com?subject=Crítica/Sugestão do aplicativo Lignem',
							)
						}
					>
						equipelignem@gmail.com
					</Text>
				</Text>
				<Text
					style={[
						styles.title,
						{ color: theme.colors.text, marginTop: 20, marginBottom: 10 },
					]}
				>
					Integrantes
				</Text>

				{list.map((item, i) => (
					<View key={i}>
						<ListItem
							accessible
							accessibilityLabel={`Integrante: ${item.name}`}
							containerStyle={{ backgroundColor: theme.colors.background }}
							leftAvatar={{
								source: item.avatar,
							}}
							rightElement={
								<View style={{ flexDirection: 'row' }}>
									{item.sites.types.map((type, i) => (
										<View
											key={i}
											accessible
											accessibilityLabel={`Rede social ${type} do integrante`}
											onAccessibilityTap={() =>
												Linking.openURL(item.sites.urls[i])
											}
										>
											<View importantForAccessibility="no-hide-descendants">
												<SocialIcon
													type={type}
													style={styles.icon}
													iconSize={20}
													onPress={() => Linking.openURL(item.sites.urls[i])}
													onAccessibilityTap={() =>
														Linking.openURL(item.sites.urls[i])
													}
												/>
											</View>
										</View>
									))}
								</View>
							}
							title={item.name}
							titleStyle={{ color: theme.colors.text }}
							pad={15}
							bottomDivider={!theme.dark}
						/>
						{i !== list.length - 1 && theme.dark && (
							<Divider style={{ height: 0.5, backgroundColor: '#707477' }} />
						)}
					</View>
				))}
			</View>
		</ScrollView>
	);
};

const list = [
	{
		name: 'Arthur Carvalho Guerra',
		avatar: require('../../../assets/sobre/guerra.jpg'),
		sites: {
			types: ['instagram', 'github'],
			urls: [
				'https://instagram.com/arthur_cg2',
				'https://github.com/arthurcg2',
			],
		},
	},
	{
		name: 'Gabriel Castilho Mazzeu',
		avatar: require('../../../assets/sobre/gabriel.jpg'),
		sites: {
			types: ['github'],
			urls: ['https://github.com/GzinSocker'],
		},
	},
	{
		name: 'Iago Gabino Gonçalves',
		avatar: require('../../../assets/sobre/iagogabino.jpg'),
		sites: {
			types: ['instagram', 'github'],
			urls: [
				'https://instagram.com/iagogabino',
				'https://github.com/IagoGabino',
			],
		},
	},
	{
		name: 'Pedro Henrique Madeira',
		avatar: require('../../../assets/sobre/pedrin.jpg'),
		sites: {
			types: ['github'],
			urls: ['https://github.com/pedrohenriquemop'],
		},
	},
	{
		name: 'Sandro Renato Dias',
		avatar: require('../../../assets/sobre/sandroRD.jpeg'),
		sites: {
			types: [],
			urls: [],
		},
	},
];

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
		paddingVertical: 10,
		paddingHorizontal: 5,
	},
	title: {
		textAlign: 'center',
		fontSize: 25,
		color: '#333',
	},
	normalText: {
		textAlign: 'justify',
		fontSize: 20,
		margin: 10,
		marginTop: 10,
		marginBottom: 0,
	},
	icon: {
		height: 30,
		width: 30,
		borderRadius: 100,
	},
});

export default Sobre;
