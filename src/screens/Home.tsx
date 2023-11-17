import React from 'react';
import {Block, Button, Table, Text} from '../ui/components';
import {sampleCSVData} from '../data/sample';
import {spacing} from '../ui/theme/constants';
import {useTheme} from '../ui/theme/ThemeContext';

const formatCsvData = (csvString: string) => {
  const rows = csvString.split('\n');
  const columns = rows[0].split(',');
  const data = rows.slice(1).map(row => {
    const rowData = row.split(',');
    const rowObject: {[key: string]: any} = {};
    columns.forEach((column, index) => {
      rowObject[column] = rowData[index];
    });
    return rowObject;
  });
  return {data, columns};
};

const variations = ['Basic', 'Customised'];
const defaultVariation = variations[0];

const PAGE_SIZE = 10;

const Home = () => {
  const {data, columns} = formatCsvData(sampleCSVData);
  const {colors} = useTheme();

  const [selctedVariation, setSelectedVariation] =
    React.useState<string>(defaultVariation);
  return (
    <Block topInset ph="xs" flex={1} backgroundColor={colors.background2}>
      <Block row gap={spacing.m} mt="m">
        {variations.map((variation, index) => {
          const isSelected = variation === selctedVariation;
          return (
            <Button
              key={index}
              onPress={() => setSelectedVariation(variation)}
              color={
                isSelected ? colors.surfacePrimary : colors.surfaceDisabled
              }>
              {variation}
            </Button>
          );
        })}
      </Block>
      {selctedVariation === defaultVariation ? (
        <Table columns={columns} data={data} pageSize={PAGE_SIZE} />
      ) : (
        <Table
          columns={columns}
          data={data}
          pageSize={PAGE_SIZE}
          headerBackgroundColor={colors.surfacePrimaryLowest}
          renderHeaderItem={headerTitle => {
            return (
              <Text
                key={headerTitle}
                flex={1}
                c1
                align="center"
                numberOfLines={2}
                color={colors.textHigh}>
                {headerTitle}
              </Text>
            );
          }}
          renderRowItem={item => (
            <Block
              p="m"
              flexDirection="row"
              backgroundColor={colors.surfaceSuccessLowest}
              borderBottomWidth={1}
              borderColor={colors.borderOutline}>
              {columns.map((column, index) => (
                <Text key={index} flex={1} align="center">
                  {item[column]}
                </Text>
              ))}
            </Block>
          )}
        />
      )}
    </Block>
  );
};

export default Home;
