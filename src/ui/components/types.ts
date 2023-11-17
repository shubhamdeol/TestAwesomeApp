import {ViewStyle} from 'react-native';
import {spacing} from '../theme/constants';

export type Spacing = typeof spacing;

export interface MarginPaddingProps {
  p?: keyof Spacing | undefined;
  pt?: keyof Spacing | undefined;
  pv?: keyof Spacing | undefined;
  pb?: keyof Spacing | undefined;
  ph?: keyof Spacing | undefined;
  pr?: keyof Spacing | undefined;
  pl?: keyof Spacing | undefined;
  m?: keyof Spacing | undefined;
  mt?: keyof Spacing | undefined;
  mv?: keyof Spacing | undefined;
  mb?: keyof Spacing | undefined;
  mh?: keyof Spacing | undefined;
  mr?: keyof Spacing | undefined;
  ml?: keyof Spacing | undefined;
}

export interface BorderRadiusProps {
  br?: number | undefined;
  btlr?: number | undefined;
  btrr?: number | undefined;
  bblr?: number | undefined;
  bbrr?: number | undefined;
}

export interface AlignmentProps {
  top?: ViewStyle['top'];
  bottom?: ViewStyle['bottom'];
  left?: ViewStyle['left'];
  right?: ViewStyle['right'];
}

export type ShadowLevel = 'x' | '2x' | '3x' | '4x' | '5x';
