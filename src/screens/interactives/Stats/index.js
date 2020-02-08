import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export default Stats = ({ currentStats }) => {
	const [colors, setColors] = useState(new Array(4).fill('#e6cd7e'));

	useEffect(() => {
		let newColors = new Array(4).fill('#e6cd7e');

		newColors.map((color, i) => {
			if (currentStats[i] > (2 * gameStats[i].maxValue) / 3)
				newColors[i] = '#42f55d';
			else if (currentStats[i] < gameStats[i].maxValue / 3)
				newColors[i] = '#f54242';
			else newColors[i] = '#e6cd7e';
		});

		console.log(newColors);
		setColors(newColors);
	}, [currentStats]);

	let gameStats = [
		{
			name: 'sustentabilidade',
			icon: 'leaf',
			value: currentStats[0],
			maxValue: 20,
		},
		{
			name: 'popularidade',
			icon: 'group',
			value: currentStats[1],
			maxValue: 20,
		},
		{
			name: 'finanças',
			icon: 'dollar',
			value: currentStats[2],
			maxValue: 20,
		},
		{
			name: 'energia',
			icon: 'bolt',
			value: currentStats[3],
			maxValue: 20,
		},
	];

	return (
		<View style={styles.statsContainer}>
			{gameStats.map((stat, i) => (
				<View key={i} style={styles.stat}>
					<View style={styles.statBar}>
						<View
							style={{
								width: '100%',
								height: (stat.value / stat.maxValue) * 100 + '%',
								backgroundColor: colors[i],
							}}
						/>
					</View>
					<Icon name={stat.icon} size={32} color="#6048b0" />
				</View>
			))}
		</View>
	);
};
