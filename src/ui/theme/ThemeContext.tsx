import {Platform} from 'react-native';
import * as React from 'react';

import Colors from './Colors';
import {spacing} from './constants';

export {Colors};

export type Font = {
  fontFamily: string;
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
};

const configureFonts = (config = {}) => {
  const fontConfig = {
    ios: {
      bold: {
        fontFamily: 'Montserrat-Bold',
        fontWeight: '600',
      },
      medium: {
        fontFamily: 'Montserrat-Medium',
        fontWeight: '500',
      },
      regular: {
        fontFamily: 'Montserrat-Regular',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'Montserrat-Light',
        fontWeight: 'normal',
      },
    },
    android: {
      bold: {
        fontFamily: 'Montserrat-Bold',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'Montserrat-Medium',
        fontWeight: 'normal',
      },
      regular: {
        fontFamily: 'Montserrat-Regular',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'Montserrat-Light',
        fontWeight: 'normal',
      },
    },
    default: {
      bold: {
        fontFamily: 'Montserrat-Bold',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'Montserrat-Medium',
        fontWeight: 'normal',
      },
      regular: {
        fontFamily: 'Montserrat-Regular',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'Montserrat-Light',
        fontWeight: 'normal',
      },
    },
  };
  const font = Platform.select({...fontConfig, ...config});
  return font;
};

export const defaultTheme = {
  dark: false,
  colors: {
    background1: Colors.grey50,
    background2: Colors.grey0,
    borderAlt1: Colors.pink500,
    borderAlt1Low: Colors.pink300,
    borderAlt2: Colors.blue500,
    borderAlt2Low: Colors.blue300,
    borderDivider: Colors.grey200,
    borderError: Colors.red500,
    borderErrorLow: Colors.red300,
    borderOutline: Colors.grey100,
    borderPrimary: Colors.violet500,
    borderPrimaryLow: Colors.violet300,
    borderSuccess: Colors.green50,
    borderSuccessLow: Colors.green300,
    borderWarning: Colors.brown500,
    borderWarningLow: Colors.brown300,
    iconAlt1: Colors.pink500,
    iconAlt2: Colors.blue500,
    iconError: Colors.red500,
    iconHigh: Colors.grey900,
    iconLow: Colors.grey400,
    iconLowest: Colors.grey300,
    iconMedium: Colors.grey600,
    iconOnSurface: Colors.grey0,
    iconPrimary: Colors.violet500,
    iconSuccess: Colors.green500,
    iconWarning: Colors.brown500,
    surfaceAlt1: Colors.pink500,
    surfaceAlt1Lowest: Colors.pink100,
    surfaceAlt2: Colors.blue500,
    surfaceAlt2Lowest: Colors.blue100,
    surfaceDanger: Colors.red800,
    surfaceDefault: Colors.grey0,
    surfaceDefaultAlt: Colors.grey0,
    surfaceDisabled: Colors.grey300,
    surfaceErrorLowest: Colors.red100,
    surfaceInverse: Colors.grey900,
    surfaceNeutralLowest: Colors.grey100,
    surfacePrimary: Colors.violet500,
    surfacePrimaryLowest: Colors.violet100,
    surfaceSuccess: Colors.green500,
    surfaceSuccessLowest: Colors.green100,
    surfaceWarningLowest: Colors.brown100,
    textAlt1: Colors.pink600,
    textAlt2: Colors.blue600,
    textError: Colors.red500,
    textHigh: Colors.grey900,
    textLow: Colors.grey300,
    textLowest: Colors.green200,
    textPrimary: Colors.violet500,
    textMedium: Colors.grey500,
    textOnSurface: Colors.grey0,
    textSuccess: Colors.green500,
    textWarning: Colors.brown600,
  },
  fonts: configureFonts(),
  spacing: spacing,
};

export const darkTheme = {
  dark: true,
  colors: {
    ...defaultTheme.colors,
  },
  fonts: configureFonts(),
};

const ThemeContext = React.createContext(defaultTheme);

export const ThemeProvider = ({
  children,
  theme,
}: {
  children: React.ReactElement;
  theme: typeof defaultTheme;
}) => {
  const appTheme = theme.dark
    ? {
        ...darkTheme,
        ...theme,
      }
    : {
        ...defaultTheme,
        ...theme,
      };

  return (
    <ThemeContext.Provider value={appTheme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const theme = React.useContext(ThemeContext);
  return theme;
};
