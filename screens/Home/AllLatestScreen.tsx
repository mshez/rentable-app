import React, { useState } from 'react';
import { StyleSheet, FlatList, Alert, VirtualizedList } from 'react-native';
import { useRoute } from '@react-navigation/native';

import useGetLatestListings from '../../hooks/api/listings/useGetLatestListings';
import { IListing } from '../../interface';
import AdCard from '../../components/Common/AdCard';
import { View, Text } from '../../components/Themed';

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
    <View style={styles.section}>
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
    </View>
  );
}
