import React from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components';

export const Container = styled(Animated.View)`
	align-items: center;
	justify-content: center;
	width: 100%;
	margin: 0;
`;

export const Brand = styled(Animated.View)`
	height: 320px;
	border-radius: 10px;
	width: 280px;
	margin: auto;
	background-color: rgba(248, 229, 92, 1);
	align-self: center;
	position: absolute;
`;

export const Swap = styled(Animated.View)`
	background-color: rgba(248, 241, 193, 1);
	box-shadow: 2px 2px;
	height: 320px;
	border-radius: 10px;
	width: 280px;
	margin: auto;
	align-items: flex-start;
	justify-content: space-between;
	flex-direction: row;
`;

export const No = styled(Animated.View)`
	height: 50px;
	width: 280px;
	background-color: red;
	/* border-bottom-left-radius: 100px; */
	border-top-right-radius: 10px;
	border-top-left-radius: 10px;
	justify-content: center;
	align-items: center;
	/* padding-bottom: 20px; */
	/* padding-left: 20px; */
	position: absolute;
`;

export const Yes = styled(Animated.View)`
	height: 50px;
	width: 280px;
	background-color: green;
	/* border-bottom-left-radius: 100px; */
	border-top-right-radius: 10px;
	border-top-left-radius: 10px;
	justify-content: center;
	align-items: center;
	/* padding-bottom: 20px; */
	/* padding-left: 20px; */
	position: absolute;
`;

export const OptionText = styled.Text`
	color: white;
	font-size: 25px;
	font-weight: bold;
`;
