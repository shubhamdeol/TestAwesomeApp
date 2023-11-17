import {Pressable} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import Block from './Block';
import Text from './Text';
import React from 'react';

interface ListItemProps {
  leftItem?: React.ReactNode;
  rightItem?: React.ReactNode;
  heading: string | null;
  subHeading?: string | null;
  onPress?: () => void;
}

const ListItem = ({
  leftItem,
  rightItem,
  heading,
  subHeading,
  onPress,
}: ListItemProps) => {
  const {colors} = useTheme();
  return (
    <Pressable onPress={onPress}>
      <Block row pv="s" color={colors.background2} mb="xs">
        {!!leftItem && leftItem}
        <Block justify="flex-start" align="flex-start">
          <Text>{heading}</Text>
          <Text>{subHeading}</Text>
        </Block>
        {rightItem}
      </Block>
    </Pressable>
  );
};

export default ListItem;
