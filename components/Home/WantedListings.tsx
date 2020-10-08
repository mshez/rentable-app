import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import useGetWantedListings from '../../hooks/api/listings/useGetWantedListings';
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

export default function WantedListings() {
  const { listings, isLoading } = useGetWantedListings();
  const renderItem = ({ item }: any) => <AdCard listing={item} />;
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.title}>WantedListings</Text>
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
