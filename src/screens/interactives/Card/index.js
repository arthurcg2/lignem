import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

import styles from './styles';

export default function Card({ navigation, text, relatedContent }) {
	return (
		<View style={styles.container}>
			<TouchableWithoutFeedback>
				<View style={styles.labelContainer}>
					<Text style={styles.label}>{text}</Text>
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
}
