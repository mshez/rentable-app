import { useNavigation } from '@react-navigation/native';
import React from 'react';

import useGetFeaturedListings from '../../hooks/api/listings/useGetFeaturedListings';
import ListingSection from './components/ListingSection';

export default function FeaturedListings() {
  const { listings } = useGetFeaturedListings();
  const navigation = useNavigation();
  return (
    <ListingSection
      listings={listings}
      sectionTitle="Featured listings"
      viewMoreHandler={() => navigation.navigate('AllFeaturedScreen')}
    />
  );
}
