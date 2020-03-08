import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import { ListItem, SocialIcon, Icon } from 'react-native-elements';

const Sobre = () => {
	return (
		<ScrollView style={styles.container}>
			<View>
				<Text style={styles.title}> Sobre o Projeto </Text>
				<Text style={styles.normalText}>
					Nós somos a equipe Lignem, finalista da Maratona Brasil Mais TI 2019.
					Nossos integrantes são Arthur Carvalho Guerra, Gabriel Castilho, Iago
					Gabino, Pedro Henrique Madeira e Sandro Renato Dias, do CEFET-MG.
					Nosso aplicativo tem foco nas matérias de Geografia e Física, além de
					uma aplicação prática baseada no jogo Reigns. {'\n\n'}Para
					críticas/sugestões, entre em contato: equipelignem@gmail.com
				</Text>
				<Text style={styles.title}> Quem somos? </Text>

				{list.map((item, i) => (
					<ListItem
						key={i}
						//leftAvatar={{ source: { uri: item.avatar_url } }}
						title={item.name}
						leftIcon={<Icon name="person-outline" />}
						rightIcon={
							<SocialIcon
								type="github"
								style={styles.icon}
								onPress={() => Linking.openURL('https://github.com/' + item.gh)}
							/>
						}
						rightElement={
							<SocialIcon
								type="instagram"
								style={styles.icon}
								onPress={() =>
									Linking.openURL('https://instagram.com/' + item.ig)
								}
							/>
						}
						pad={7}
						bottomDivider
					/>
				))}
			</View>
		</ScrollView>
	);
};

const list = [
	{
		name: 'Arthur Carvalho Guerra',
		avatar_url: '',
		ig: 'arthur_cg2',
		gh: 'arthurcg2',
	},
	{
		name: 'Gabriel Castilho Mazzeu',
		avatar_url: '',
		// icon: 'person',
		ig: '',
		gh: '',
	},
	{
		name: 'Iago Gabino Gonçalves',
		avatar_url: '',
		// icon: 'person',
		ig: 'iagogabino',
		gh: 'IagoGabino',
	},
	{
		name: 'Pedro Henrique Madeira',
		avatar_url: '',
		// icon: 'person',
		ig: '',
		gh: '',
	},
	{
		name: 'Sandro Renato Dias',
		avatar_url: '',
		// icon: 'person',
		ig: '',
		gh: '',
	},
];

Sobre.navigationOptions = {
	title: 'Sobre',
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
	},
	title: {
		textAlign: 'center',
		fontSize: 25,
		color: '#333',
		marginLeft: 18,
		marginTop: 10,
		marginBottom: 20,
	},
	normalText: {
		textAlign: 'justify',
		fontSize: 20,
		margin: 10,
		marginTop: 0,
		marginBottom: 0,
	},
	icon: {
		height: 40,
		width: 40,
		borderRadius: 100,
	},
});

export default Sobre;
