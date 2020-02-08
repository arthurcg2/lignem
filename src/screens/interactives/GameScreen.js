/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';

import { View, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Logo from '../../components/Logo';
import Chooser from './Chooser';

const GameMain = () => {
	const [colors, setColors] = useState(new Array(4).fill('#e6cd7e'));
	const [stats, setStats] = useState(new Array(4).fill(0));

	let gameStats = [
		{
			name: 'sustentabilidade',
			icon: 'leaf',
			value: stats[0],
			maxValue: 20,
		},
		{
			name: 'popularidade',
			icon: 'group',
			value: stats[1],
			maxValue: 20,
		},
		{
			name: 'finanças',
			icon: 'dollar',
			value: stats[2],
			maxValue: 20,
		},
		{
			name: 'energia',
			icon: 'bolt',
			value: stats[3],
			maxValue: 20,
		},
	];

	return (
		<View style={styles.container}>
			<Chooser />
			<View style={styles.statsContainer}>
				{gameStats.map((stat, i) => (
					<View key={i} style={styles.stat}>
						<View style={styles.statBar}>
							<View
								style={{
									width: '100%',
									height:
										(gameStats[i].value / gameStats[i].maxValue) * 100 + '%',
									backgroundColor: colors[i],
								}}
							/>
						</View>
						<Icon name={gameStats[i].icon} size={32} color="#6048b0" />
					</View>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 25,
	},
	statsContainer: {
		height: '25%',
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	stat: {
		width: '30%',
		height: '100%',
		alignItems: 'center',
	},
	statBar: {
		width: 30,
		height: 75,
		marginBottom: 10,
		borderWidth: 2,
		borderColor: '#6048b0',
		padding: 2,
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
});

GameMain.navigationOptions = {
	headerTitle: <Logo />,
};

export default GameMain;
