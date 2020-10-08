import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import useGetLatestListings from '../../hooks/api/listings/useGetLatestListings';
import { IListing } from '../../interface';
import AdCard from '../Common/AdCard';
import { View } from '../Themed';
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

export default function LatestListings() {
  const { listings, isLoading } = useGetLatestListings();
  const renderItem = ({ item }: { item: IListing }) => <AdCard listing={item} />;
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.title}>LatestListings</Text>
      {(!isLoading && (
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={listings?.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )) || <Text style={styles.title}>Loading...</Text>}
    </View>
  );
}
