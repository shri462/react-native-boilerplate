import React, { useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  ScrollView,
  StyleProp,
  TextStyle,
  FlatList,
} from "react-native";
import { colors } from "../../../theme/colors";

export interface Column {
  key: string;
  title: string;
  width?: number;
  headerStyle?: StyleProp<TextStyle>;
  cellStyle?: StyleProp<TextStyle>;
}

interface TableProps {
  columns: Column[];
  data: Record<string, any>[];
  containerStyle?: ViewStyle;
  headerContainerStyle?: ViewStyle;
  rowContainerStyle?: ViewStyle;
  striped?: boolean;
  stripeType?: "odd" | "even";
  stripeColor?: string;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  containerStyle,
  headerContainerStyle,
  rowContainerStyle,
  striped = false,
  stripeType = "odd",
  stripeColor = colors.secondary50,
}) => {
  const getColumnStyle = useCallback(
    (column: Column): ViewStyle => ({
      width: column.width || 160,
      minWidth: column.width || 160,
    }),
    [],
  );

  const ListHeaderComponent = useCallback(
    () => (
      <View style={[styles.headerRow, headerContainerStyle]}>
        {columns.map(column => (
          <View
            key={column.key}
            style={[styles.headerCell, getColumnStyle(column)]}
          >
            <Text
              style={[styles.headerText, column.headerStyle]}
              testID={`header-${column.key}`}
              numberOfLines={1}
            >
              {column.title}
            </Text>
          </View>
        ))}
      </View>
    ),
    [columns, headerContainerStyle, getColumnStyle],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: Record<string, any>; index: number }) => {
      const isStriped =
        striped && (stripeType === "odd" ? index % 2 !== 0 : index % 2 === 0);

      return (
        <View
          style={[
            styles.dataRow,
            rowContainerStyle,
            isStriped && { backgroundColor: stripeColor },
          ]}
          testID={`row-${index}`}
        >
          {columns.map(column => (
            <View
              key={`${index}-${column.key}`}
              style={[styles.cell, getColumnStyle(column)]}
            >
              <Text
                style={[styles.cellText, column.cellStyle]}
                testID={`cell-${index}-${column.key}`}
                numberOfLines={1}
              >
                {item[column.key]}
              </Text>
            </View>
          ))}
        </View>
      );
    },
    [
      columns,
      rowContainerStyle,
      striped,
      stripeType,
      stripeColor,
      getColumnStyle,
    ],
  );

  const ListEmptyComponent = useCallback(
    () => <Text style={styles.emptyText}>No data available</Text>,
    [],
  );

  const keyExtractor = useCallback(
    (_: any, index: number) => `row-${index}`,
    [],
  );

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: 56,
      offset: 56 * index,
      index,
    }),
    [],
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ListHeaderComponent={ListHeaderComponent}
            ListEmptyComponent={ListEmptyComponent}
            getItemLayout={getItemLayout}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
            stickyHeaderIndices={[0]}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    justifyContent: "center",
    minHeight: 56,
    padding: 16,
  },
  cellText: {
    color: colors.secondary900,
    fontSize: 14,
  },
  container: {
    backgroundColor: colors.white,
    borderColor: colors.secondary200,
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  dataRow: {
    borderTopColor: colors.secondary200,
    borderTopWidth: 1,
    flexDirection: "row",
  },
  emptyText: {
    color: colors.secondary600,
    fontSize: 14,
    padding: 16,
    textAlign: "center",
  },
  headerCell: {
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: "row",
  },
  headerText: {
    color: colors.secondary600,
    fontSize: 14,
    fontWeight: "500",
  },
});

export default Table;
