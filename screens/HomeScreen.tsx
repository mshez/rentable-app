import * as React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import { ScrollView } from '../components/Themed';
import Categories from '../components/Home/Categories';
import FeaturedListings from '../components/Home/FeaturedListings';
import LatestListings from '../components/Home/LatestListings';
import WantedListings from '../components/Home/WantedListings';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
export default function HomeScreen() {
  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <FeaturedListings />
        <LatestListings />
        <WantedListings />
      </ScrollView>
    </SafeAreaView>
  );
}
