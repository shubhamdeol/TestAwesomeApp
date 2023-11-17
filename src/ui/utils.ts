import {StyleSheet} from 'react-native';
import {
  MarginPaddingProps,
  Spacing,
  BorderRadiusProps,
  AlignmentProps,
} from './components/types';

export const createMarginPaddingObj = (
  {p, ph, pb, pt, pv, pl, pr, m, mh, mb, mt, mv, mr, ml}: MarginPaddingProps,
  spacing: Spacing,
) => {
  return StyleSheet.flatten([
    p !== undefined && {padding: spacing[p]},
    ph !== undefined && {paddingHorizontal: spacing[ph]},
    pb !== undefined && {paddingBottom: spacing[pb]},
    pt !== undefined && {paddingTop: spacing[pt]},
    pv !== undefined && {paddingVertical: spacing[pv]},
    pl !== undefined && {paddingLeft: spacing[pl]},
    pr !== undefined && {paddingRight: spacing[pr]},
    m !== undefined && {margin: spacing[m]},
    mh !== undefined && {marginHorizontal: spacing[mh]},
    mb !== undefined && {marginBottom: spacing[mb]},
    mt !== undefined && {marginTop: spacing[mt]},
    mv !== undefined && {marginVertical: spacing[mv]},
    mr !== undefined && {marginRight: spacing[mr]},
    ml !== undefined && {marginLeft: spacing[ml]},
  ]);
};

export const createAlignmentProps = ({
  top,
  left,
  right,
  bottom,
}: AlignmentProps) => {
  return StyleSheet.flatten([
    top !== undefined && {top},
    bottom !== undefined && {bottom},
    right !== undefined && {right},
    left !== undefined && {left},
  ]);
};

export const createBorderRadiusObj = ({
  br,
  btlr,
  btrr,
  bblr,
  bbrr,
}: BorderRadiusProps) => {
  return StyleSheet.flatten([
    br !== undefined && {borderRadius: br},
    btlr !== undefined && {borderTopLeftRadius: btlr},
    btrr !== undefined && {borderTopRightRadius: btrr},
    bblr !== undefined && {borderBottomLeftRadius: bblr},
    bbrr !== undefined && {borderBottomRightRadius: bbrr},
  ]);
};

export function calculateAgeInYears(dateOfBirth: string) {
  const dob = new Date(dateOfBirth);
  const currentDate = new Date();

  const ageInMilliseconds = currentDate.getTime() - dob.getTime();

  const ageDate = new Date(ageInMilliseconds);
  const age = ageDate.getUTCFullYear() - 1970;

  return age;
}
