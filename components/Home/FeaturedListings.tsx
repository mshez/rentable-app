import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import useGetFeaturedListings from '../../hooks/api/listings/useGetFeaturedListings';
import { IListing } from '../../interface';
import AdCard from '../Common/AdCard';
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
    marginHorizontal: 16,
    width: 150,
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function FavouriteListings() {
  const { listings, isLoading } = useGetFeaturedListings();
  const renderItem = ({ item }: { item: IListing }) => <AdCard listing={item} />;
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.title}>FavouriteListings</Text>
      {(!isLoading && (
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={listings?.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )) || <Text style={styles.title}>Loading..</Text>}
    </View>
  );
}
