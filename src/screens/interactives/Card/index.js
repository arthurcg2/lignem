import React, { useEffect, useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';

import styles from './styles';

export default function Card({ text, character, borderRadius = 10 }) {
	const [characterImage, setCharacterImage] = useState();

	useEffect(() => {
		if (character === 'pop') {
			setCharacterImage(
				require('../../../../assets/game/characters/populacao.png'),
			);
		} else if (character === 'car') {
			setCharacterImage(
				require('../../../../assets/game/characters/carlos_joaquim.png'),
			);
		} else if (character === 'jon') {
			setCharacterImage(
				require('../../../../assets/game/characters/jonathan.png'),
			);
		} else if (character === 'rob') {
			setCharacterImage(
				require('../../../../assets/game/characters/roberto.png'),
			);
		} else if (character === 'rog') {
			setCharacterImage(
				require('../../../../assets/game/characters/rogerio_santos.png'),
			);
		} else if (character === 'igo') {
			setCharacterImage(
				require('../../../../assets/game/characters/igor_martis.png'),
			);
		}
	}, [character]);

	return (
		<View style={styles.container}>
			<Image
				style={styles.image}
				source={characterImage}
				borderRadius={borderRadius}
			/>
			<TouchableWithoutFeedback>
				<View
					style={[
						styles.labelContainer,
						{
							borderBottomLeftRadius: borderRadius,
							borderBottomRightRadius: borderRadius,
						},
					]}
				>
					<Text style={styles.label}>{text}</Text>
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
}
