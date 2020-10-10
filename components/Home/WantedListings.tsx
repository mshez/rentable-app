import { useNavigation } from '@react-navigation/native';
import React from 'react';
import useGetWantedListings from '../../hooks/api/listings/useGetWantedListings';
import ListingSection from './components/ListingSection';

export default function WantedListings() {
  const { listings } = useGetWantedListings();
  const navigation = useNavigation();
  return (
    <ListingSection
      listings={listings}
      sectionTitle="Wanted listings"
      viewMoreHandler={() =>
        navigation.navigate('ViewAllScreen', { name: 'All Wanted listings', listings })
      }
    />
  );
}
