import React, {ReactNode} from 'react';
import {
  StyleSheet,
  Pressable,
  PressableProps,
  ViewStyle,
  ActivityIndicator,
  View,
  TextStyle,
} from 'react-native';
import Text from './Text';
import {useTheme} from '../theme/ThemeContext';
import {MarginPaddingProps} from './types';
import {createMarginPaddingObj} from '../utils';

interface IButton extends PressableProps, MarginPaddingProps {
  mode?: 'text' | 'outlined' | 'contained';
  uppercase?: boolean;
  children?: ReactNode;
  color?: ViewStyle['backgroundColor'];
  radius?: ViewStyle['borderRadius'];
  style?: ViewStyle;
  loading?: boolean;
  borderWith?: ViewStyle['borderWidth'];
  h?: ViewStyle['height'];
  w?: ViewStyle['width'];
  disabled?: boolean;
  textColor?: TextStyle['color'];
}

const Button = ({
  children,
  color,
  radius,
  uppercase,
  mode = 'contained',
  loading = false,
  style,
  h,
  w,
  borderWith,
  disabled,
  textColor,
  ...props
}: IButton) => {
  const {colors, spacing} = useTheme();

  const pressableRef = React.useRef<View | null>(null);
  const buttonStyle = StyleSheet.flatten([
    color !== undefined && {backgroundColor: color},
    radius !== undefined && {borderRadius: radius},
    borderWith !== undefined && {borderWidth: borderWith},
    h !== undefined && {height: h},
    w !== undefined && {width: w},
    createMarginPaddingObj(props, spacing),
    style,
  ]);

  const stylesBasedOnMode = React.useMemo(() => {
    switch (mode) {
      case 'contained':
        return {
          backgroundColor: colors.surfacePrimary,
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: 4,
        };
      case 'outlined':
        return {
          borderWidth: 1,
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: 4,
          borderColor: colors.borderOutline,
          backgroundColor: colors.background2,
        };
      case 'text':
        return {
          paddingVertical: 12,
          paddingHorizontal: 16,
        };

      default:
        break;
    }
  }, [colors, mode]);

  const textStylesBasedOnMode = React.useMemo(() => {
    switch (mode) {
      case 'contained':
        return {
          color: colors.textOnSurface,
        };
      case 'outlined':
      case 'text':
        return {
          color: colors.textPrimary,
        };

      default:
        break;
    }
  }, [colors, mode]);

  const bgColor = (color ||
    style?.backgroundColor ||
    stylesBasedOnMode?.backgroundColor) as any as string;

  React.useEffect(() => {
    if (loading || disabled) {
      const opacity = 0.2;
      const colorWithOpacity = `rgba(${parseInt(
        bgColor.slice(1, 3),
        16,
      )}, ${parseInt(bgColor.slice(3, 5), 16)}, ${parseInt(
        bgColor.slice(5, 7),
        16,
      )}, ${opacity})`;
      pressableRef.current?.setNativeProps({
        style: {
          backgroundColor: colorWithOpacity,
        },
      });
    } else {
      pressableRef.current?.setNativeProps({
        style: {
          backgroundColor: bgColor,
        },
      });
    }
  }, [loading, disabled]);

  return (
    <Pressable
      ref={pressableRef}
      disabled={loading || disabled}
      style={[stylesBasedOnMode, buttonStyle]}
      {...props}>
      {loading ? (
        <ActivityIndicator color={colors.iconHigh} />
      ) : (
        <Text
          bt1
          align="center"
          color={
            (color && textColor ? textColor : undefined) ||
            textStylesBasedOnMode?.color ||
            color
          }
          textTransform={uppercase ? 'uppercase' : 'none'}
          numberOfLines={1}
          adjustsFontSizeToFit>
          {children}
        </Text>
      )}
    </Pressable>
  );
};

export default Button;
