import React, { useState, useEffect } from 'react';
import { Animated, View } from 'react-native';

import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';

export default Stats = ({ currentStats, oldValues }) => {
	const [colors, setColors] = useState(new Array(4).fill('#e6cd7e'));
	const theme = useTheme();

	useEffect(() => {
		let newColors = new Array(4).fill('#e6cd7e');

		newColors.map((color, i) => {
			if (currentStats[i].value > (2 * currentStats[i].maxValue) / 3)
				newColors[i] = '#42f55d';
			else if (currentStats[i].value < currentStats[i].maxValue / 3)
				newColors[i] = '#f54242';
			else newColors[i] = '#e6cd7e';
		});

		setColors(newColors);
	}, [currentStats]);

	return (
		<View style={styles.statsContainer}>
			{currentStats.map((stat, i) => {
				const statValue = new Animated.Value(oldValues[i]);

				Animated.timing(statValue, {
					toValue: stat.value,
					duration: 100,
				}).start();

				return (
					<View key={i} style={styles.stat}>
						<View
							style={[
								styles.statBar,
								{ borderColor: theme.colors.primaryDarken },
							]}
						>
							<Animated.View
								style={{
									width: '100%',
									height: statValue.interpolate({
										inputRange: [0, stat.maxValue],
										outputRange: ['0%', '100%'],
										extrapolate: 'clamp',
									}),
									backgroundColor: statValue.interpolate({
										inputRange: [0, stat.maxValue / 2, stat.maxValue],
										outputRange: [
											'rgb(255, 0, 0)',
											'rgb(230, 205, 126)',
											'rgb(0, 255, 0)',
										],
										extrapolate: 'clamp',
									}),
								}}
							/>
						</View>
						<Icon
							name={stat.icon}
							size={32}
							color={theme.colors.primaryDarken}
						/>
					</View>
				);
			})}
		</View>
	);
};
