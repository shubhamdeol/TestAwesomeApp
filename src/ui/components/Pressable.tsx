import React, {ReactNode} from 'react';
import {
  StyleProp,
  StyleSheet,
  Pressable as RnPressable,
  ViewStyle,
  PressableProps,
} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {BorderRadiusProps, MarginPaddingProps} from './types';
import {createBorderRadiusObj, createMarginPaddingObj} from '../utils';

export interface IPressable
  extends PressableProps,
    MarginPaddingProps,
    BorderRadiusProps {
  children?: ReactNode;
  flex?: ViewStyle['flex'];
  flexGrow?: ViewStyle['flexGrow'];
  flexWrap?: ViewStyle['flexWrap'];
  color?: ViewStyle['backgroundColor'];
  align?: ViewStyle['alignItems'];
  justify?: ViewStyle['justifyContent'];
  alignSelf?: ViewStyle['alignSelf'];
  row?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Pressable = ({
  children,
  flex,
  flexGrow,
  flexWrap,
  color,
  align,
  alignSelf,
  justify,
  row,
  style,
  ...props
}: IPressable) => {
  const {spacing, colors} = useTheme();
  const blockStyle = StyleSheet.flatten([
    flex !== undefined && {flex},
    flexGrow !== undefined && {flexGrow},
    flexWrap !== undefined && {flexWrap},
    {backgroundColor: color || colors.background2},
    align !== undefined && {alignItems: align},
    alignSelf !== undefined && {alignSelf},
    justify !== undefined && {justifyContent: justify},
    row !== undefined && {flexDirection: 'row'},
    createBorderRadiusObj(props),
    createMarginPaddingObj(props, spacing),
    style,
  ]) as ViewStyle;
  return (
    <RnPressable style={blockStyle} {...props}>
      {children}
    </RnPressable>
  );
};

export default Pressable;
