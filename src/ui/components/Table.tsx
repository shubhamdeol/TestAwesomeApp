import React, {useState} from 'react';
import {FlatList, ScrollView, StyleSheet} from 'react-native';
import Block from './Block';
import Pressable from './Pressable';
import Text from './Text';
import {spacing} from '../theme/constants';
import {useTheme} from '../theme/ThemeContext';

interface DataTableProps {
  columns: string[];
  data: {[key: string]: any}[];
  pageSize: number;
  renderHeaderItem?: (column: string) => React.ReactElement;
  renderRowItem?: (item: {[key: string]: any}) => React.ReactElement;
  headerBackgroundColor?: string;
}

const DataTable = ({
  columns,
  data,
  pageSize,
  renderRowItem,
  renderHeaderItem,
  headerBackgroundColor,
}: DataTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const {colors} = useTheme();

  const onPageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(data.length / pageSize);

    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{
          paddingBottom: spacing.m,
        }}>
        {Array.from({length: totalPages}).map((_, index) => (
          <Pressable
            key={index}
            color={
              currentPage === index + 1
                ? colors.surfaceAlt1
                : colors.surfacePrimary
            }
            style={styles.paginationButton}
            br={4}
            mr="xs"
            mv="m"
            justify="center"
            align="center"
            onPress={() => onPageChange(index + 1)}>
            <Text color={colors.textOnSurface} c3>
              {index + 1}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    );
  };

  const renderTableHeader = () => {
    return (
      <Block
        flexDirection="row"
        pv="m"
        backgroundColor={headerBackgroundColor || colors.background1}>
        {columns.map((column, index) => {
          if (renderHeaderItem) {
            return renderHeaderItem(column);
          }
          return (
            <Text key={index} flex={1} c1 align="center" numberOfLines={2}>
              {column}
            </Text>
          );
        })}
      </Block>
    );
  };

  const renderTableRow = ({item}: {item: {[key: string]: any}}) => {
    if (renderRowItem) {
      return renderRowItem(item);
    }
    return (
      <Block
        p="m"
        flexDirection="row"
        borderBottomWidth={1}
        borderColor={colors.borderOutline}>
        {columns.map((column, index) => (
          <Text key={index} flex={1} align="center">
            {item[column]}
          </Text>
        ))}
      </Block>
    );
  };

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <Block topInset flex={1}>
      {renderTableHeader()}
      <FlatList
        contentContainerStyle={[
          styles.dataTable,
          {
            backgroundColor: colors.background2,
          },
        ]}
        data={paginatedData}
        renderItem={renderTableRow}
        keyExtractor={(_, index) => index.toString()}
      />
      {renderPagination()}
    </Block>
  );
};

export default DataTable;

const styles = StyleSheet.create({
  paginationButton: {
    height: 30,
    width: 30,
  },
  dataTable: {
    flexGrow: 1,
  },
});
