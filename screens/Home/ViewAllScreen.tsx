import React from 'react';
import { StyleSheet, FlatList } from 'react-native';

import useGetLatestListings from '../../hooks/api/listings/useGetLatestListings';
import { IListing } from '../../interface';
import AdCard from '../../components/Common/AdCard';
import { View, Text } from '../../components/Themed';
import { useRoute } from '@react-navigation/native';

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
    marginLeft: 15,
  },
  section: {
    height: '100%',
  },
  sectionHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
    marginLeft: 10,
  },
  item: {
    marginHorizontal: 10,
    width: 150,
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function ViewAll() {
  const route = useRoute();

  const renderItem = ({ item }: { item: IListing }) => (
    <AdCard listing={item} style={{ marginRight: 5, marginBottom: 5 }} />
  );

  return (
    <View style={styles.section}>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={{}}
        data={route.params?.listings?.data || {}}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
