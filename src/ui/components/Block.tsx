import React, {ComponentProps, ReactNode} from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {
  AlignmentProps,
  BorderRadiusProps,
  MarginPaddingProps,
  ShadowLevel,
} from './types';
import {
  createAlignmentProps,
  createBorderRadiusObj,
  createMarginPaddingObj,
} from '../utils';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';

interface BlockCommonProps extends ViewStyle {
  children?: ReactNode;
  flex?: ViewStyle['flex'];
  flexGrow?: ViewStyle['flexGrow'];
  flexWrap?: ViewStyle['flexWrap'];
  color?: ViewStyle['backgroundColor'];
  overflow?: ViewStyle['overflow'];
  h?: ViewStyle['height'];
  w?: ViewStyle['width'];
  align?: ViewStyle['alignItems'];
  justify?: ViewStyle['justifyContent'];
  alignSelf?: ViewStyle['alignSelf'];
  gap?: ViewStyle['gap'];
  row?: boolean;
  borderWith?: ViewStyle['borderWidth'];
  borderColor?: ViewStyle['borderColor'];
  absolute?: boolean;
  style?: StyleProp<ViewStyle>;
  topInset?: boolean;
  bottomInset?: boolean;
  reanimated?: boolean;
  shadowLevel?: ShadowLevel;
  shadowColorIOS?: ViewStyle['shadowColor'];
}

type ReanimatedBlockProps = {
  reanimated: true;
} & BlockCommonProps &
  ComponentProps<typeof Animated.View>;

type RegularBlockProps = {
  reanimated?: false;
} & BlockCommonProps;

export interface IBlock
  extends ViewProps,
    MarginPaddingProps,
    BorderRadiusProps,
    AlignmentProps {}

type Props = IBlock & (ReanimatedBlockProps | RegularBlockProps);

const Block = ({
  children,
  flex,
  flexGrow,
  flexWrap,
  color,
  align,
  alignSelf,
  justify,
  borderWith,
  overflow,
  w,
  h,
  row,
  gap,
  borderColor,
  style,
  topInset,
  bottomInset,
  absolute,
  reanimated,
  shadowLevel,
  shadowColorIOS,
  ...props
}: Props) => {
  const {spacing} = useTheme();
  const insets = useSafeAreaInsets();

  const levelMap: {[key: string]: number} = {
    x: 1,
    '2x': 2,
    '3x': 3,
    '4x': 4,
    '5x': 5,
  };

  let shadowStyle: ViewStyle = {};
  if (shadowLevel) {
    let selectedLevel = levelMap[shadowLevel] || levelMap['x'];

    if (Platform.OS === 'ios') {
      shadowStyle = {
        shadowColor: shadowColorIOS || '#000000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.4,
        shadowRadius: selectedLevel * 2,
      };
    } else if (Platform.OS === 'android') {
      shadowStyle = {
        elevation: selectedLevel * 2,
      };
    }
  }

  const blockStyle = StyleSheet.flatten([
    flex !== undefined && {flex},
    absolute !== undefined && {position: 'absolute'},
    flexGrow !== undefined && {flexGrow},
    flexWrap !== undefined && {flexWrap},
    overflow !== undefined && {overflow},
    color !== undefined && {backgroundColor: color},
    align !== undefined && {alignItems: align},
    alignSelf !== undefined && {alignSelf},
    justify !== undefined && {justifyContent: justify},
    row !== undefined && {flexDirection: 'row'},
    borderWith !== undefined && {borderWidth: borderWith},
    borderColor !== undefined && {borderColor},
    h !== undefined && {height: h},
    w !== undefined && {width: w},
    gap !== undefined && {gap},
    createBorderRadiusObj(props),
    createMarginPaddingObj(props, spacing),
    createAlignmentProps(props),
    topInset && {paddingTop: insets.top},
    bottomInset && {paddingBottom: insets.bottom},
    shadowStyle,
    style,
  ]) as ViewStyle;

  if (reanimated) {
    return (
      <Animated.View style={blockStyle} {...props}>
        {children}
      </Animated.View>
    );
  }

  return (
    <View style={blockStyle} {...props}>
      {children}
    </View>
  );
};

export default Block;
