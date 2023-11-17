import React, {forwardRef} from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import Block from './Block';
import Text from './Text';
import {MarginPaddingProps} from './types';
import {createMarginPaddingObj} from '../utils';

interface IInput extends TextInputProps, MarginPaddingProps {
  label: string;
  placeholder?: string;
  errorMessage?: string;
}

const Input = forwardRef<TextInput, IInput>(
  ({children, label, placeholder, errorMessage, ...props}, ref) => {
    const {colors, fonts, spacing} = useTheme();
    const blockStyle = StyleSheet.flatten([
      createMarginPaddingObj(props, spacing),
    ]);

    const hasError = Boolean(errorMessage);
    return (
      <Block>
        <Text s1 color={colors.textHigh} mb="xxs">
          {label}
        </Text>
        <TextInput
          ref={ref}
          selectionColor={colors.iconPrimary}
          placeholder={placeholder || label}
          style={[
            blockStyle,
            styles.input,
            {
              borderColor: hasError ? colors.textError : colors.borderOutline,
              ...fonts.medium,
              color: colors.textHigh,
            },
          ]}
          {...props}>
          {children}
        </TextInput>
        <Text align="right" c1 color={colors.textError}>
          {errorMessage}
        </Text>
      </Block>
    );
  },
);

export default Input;

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    fontSize: 16,
    paddingVertical: 8,
    letterSpacing: 0.5,
  },
});
