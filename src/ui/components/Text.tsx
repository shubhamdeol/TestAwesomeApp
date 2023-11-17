import React, {ReactNode} from 'react';
import {StyleSheet, Text as RNText, TextProps, TextStyle} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {MarginPaddingProps} from './types';
import {createMarginPaddingObj} from '../utils';

interface IText extends TextProps, MarginPaddingProps {
  children?: ReactNode;
  flex?: number;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  s1?: boolean;
  s2?: boolean;
  s3?: boolean;
  s4?: boolean;
  s5?: boolean;
  c1?: boolean;
  c2?: boolean;
  c3?: boolean;
  bt1?: boolean;
  size?: TextStyle['fontSize'];
  color?: TextStyle['color'];
  align?: TextStyle['textAlign'];
  textTransform?: TextStyle['textTransform'];
}

const Text = ({
  children,
  flex,
  color,
  size,
  h1,
  h2,
  h3,
  h4,
  h5,
  s1,
  s2,
  s3,
  s4,
  s5,
  c1,
  c2,
  c3,
  bt1,
  align,
  textTransform,
  ...props
}: IText) => {
  const {fonts, colors, spacing} = useTheme();

  const textStyle = StyleSheet.flatten([
    bt1 !== undefined && {fontSize: 16, ...fonts.medium},
    h1 !== undefined && {fontSize: 40, ...fonts.medium},
    h2 !== undefined && {fontSize: 32, ...fonts.medium},
    h3 !== undefined && {fontSize: 24, ...fonts.medium},
    h4 !== undefined && {fontSize: 22, ...fonts.medium},
    h5 !== undefined && {fontSize: 18, ...fonts.medium},
    s1 !== undefined && {fontSize: 16, ...fonts.medium},
    s2 !== undefined && {fontSize: 16, ...fonts.regular},
    s3 !== undefined && {fontSize: 14, ...fonts.medium},
    s4 !== undefined && {fontSize: 14, ...fonts.regular},
    s5 !== undefined && {fontSize: 14, ...fonts.light},
    c1 !== undefined && {fontSize: 12, ...fonts.medium},
    c2 !== undefined && {fontSize: 12, ...fonts.regular},
    c3 !== undefined && {fontSize: 12, ...fonts.bold},
    flex !== undefined && {flex},
    align !== undefined && {textAlign: align},
    {color: color || colors.textHigh},
    size !== undefined && {fontSize: size || 16},
    textTransform !== undefined && {textTransform},
    createMarginPaddingObj(props, spacing),
  ]) as TextStyle;
  return (
    <RNText {...props} style={StyleSheet.flatten([textStyle, props.style])}>
      {children}
    </RNText>
  );
};

export default Text;
