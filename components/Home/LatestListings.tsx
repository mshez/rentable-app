import { useNavigation } from '@react-navigation/native';
import React from 'react';
import useGetLatestListings from '../../hooks/api/listings/useGetLatestListings';
import ListingSection from './components/ListingSection';

export default function LatestListings() {
  const { listings } = useGetLatestListings();
  const navigation = useNavigation();
  return (
    <ListingSection
      listings={listings}
      sectionTitle="Latest listings"
      viewMoreHandler={() => navigation.navigate('AllLatestScreen')}
    />
  );
}
