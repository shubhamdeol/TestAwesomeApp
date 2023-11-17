import {ComponentProps} from 'react';
import {useTheme} from '../theme/ThemeContext';
import Block from './Block';
import {StyleSheet} from 'react-native';
import React from 'react';

interface DividerProps extends ComponentProps<typeof Block> {
  lineColor?: string;
}

const Divider = (props: DividerProps) => {
  const {colors} = useTheme();
  return (
    <Block
      borderWith={StyleSheet.hairlineWidth}
      borderColor={props.lineColor || colors.borderOutline}
      ph="m"
      {...props}
    />
  );
};

export default Divider;
