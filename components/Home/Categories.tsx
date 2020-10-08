import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import useGetTrendingCategories from '../../hooks/api/categories/useGetTrendingCategories';
import Text from '../StyledText';

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '500',
    // color: 'white',
    marginBottom: 10,
    marginLeft: 15,
  },
  item: {
    backgroundColor: '#f9c2ff',
    // padding: 20,
    // marginVertical: 8,
    marginHorizontal: 5,
    width: 150,
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Item = ({ listing }: any) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{listing.name}</Text>
    </View>
  );
};
export default function Categories() {
  const { categories, isLoading } = useGetTrendingCategories();

  const renderItem = ({ item }: any) => {
    return <Item listing={item} />;
  };
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.title}>Categories</Text>
      {(!isLoading && (
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={categories}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        />
      )) || <Text style={styles.title}>Loading</Text>}
    </View>
  );
}
