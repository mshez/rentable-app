import React from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';

import useGetLatestListings from '../../hooks/api/listings/useGetLatestListings';
import { IListing } from '../../types/interface';
import AdCard from '../../components/Common/AdCard';

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

export default function ViewAllListings() {
  const { listings, isLoading, setPage } = useGetLatestListings();

  const renderItem = ({ item }: { item: IListing }) => (
    <AdCard listing={item} style={{ marginRight: 5, marginBottom: 5 }} />
  );

  return (
    <SafeAreaView style={styles.section}>
      <FlatList
        initialNumToRender={8}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={listings}
        renderItem={renderItem}
        keyExtractor={(item) => item.uuid}
        onEndReachedThreshold={0.01}
        onEndReached={() => {
          setPage((p) => p + 1);
        }}
        onRefresh={() => {
          setPage(1);
        }}
        refreshing={isLoading}
      />
    </SafeAreaView>
  );
}
