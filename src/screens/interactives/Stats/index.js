import React from 'react';
import { Animated, View } from 'react-native';

import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';

export default function({ currentStats, oldValues, months }) {
	const theme = useTheme();

	return (
		<View
			style={styles.statsContainer}
			accessible
			accessibilityLabel={`
			\nEstado atual dos atributos:\n 
			${currentStats[0].name}: ${(currentStats[0].value * 100) /
				currentStats[0].maxValue}%;\n
			${currentStats[1].name}: ${(currentStats[1].value * 100) /
				currentStats[1].maxValue}%;\n
			${currentStats[2].name}: ${(currentStats[2].value * 100) /
				currentStats[2].maxValue}%;\n
			${currentStats[3].name}: ${(currentStats[3].value * 100) /
				currentStats[3].maxValue}%;\n
			Tempo de governo até o momento: ${months}
		`}
		>
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
}
