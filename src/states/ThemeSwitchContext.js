import React, { createContext, useContext } from 'react';
import { useReducer } from 'react';

export const ThemeSwitchContext = createContext();

export const ThemeSwitchProvider = ({ reducer, initialState, children }) => (
	<ThemeSwitchContext.Provider value={useReducer(reducer, initialState)}>
		{children}
	</ThemeSwitchContext.Provider>
);

export const useSwitchTheme = () => useContext(ThemeSwitchContext)[1];
