import * as React from 'react';
import { StyleSheet, SafeAreaView, RefreshControl } from 'react-native';

import { ScrollView } from '../components/Themed';
import Categories from '../components/Home/Categories';
import FeaturedListings from '../components/Home/FeaturedListings';
import LatestListings from '../components/Home/LatestListings';
import WantedListings from '../components/Home/WantedListings';
import useGetLatestListings from '../hooks/api/listings/useGetLatestListings';
import useGetFeaturedListings from '../hooks/api/listings/useGetFeaturedListings';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default function HomeScreen() {
  const { refetch: RefetchLatest, listings: NewListings } = useGetLatestListings();
  const { refetch: RefetchFeatured, listings: NewFeaturedListings } = useGetFeaturedListings();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await RefetchLatest;
    await RefetchFeatured;
    setRefreshing(false);
  }, [RefetchLatest, RefetchFeatured]);

  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView
        style={{ width: '100%' }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Categories />
        <FeaturedListings listings={NewFeaturedListings} />
        <LatestListings listings={NewListings} />
        <WantedListings />
      </ScrollView>
    </SafeAreaView>
  );
}
