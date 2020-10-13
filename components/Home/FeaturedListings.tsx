import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { IListing } from '../../interface';
import ListingSection from './components/ListingSection';

type FeaturedListings = {
  listings: IListing[] | null;
};
export default function FeaturedListings({ listings }: FeaturedListings) {
  const navigation = useNavigation();
  return (
    <ListingSection
      listings={listings}
      sectionTitle="Featured listings"
      viewMoreHandler={() => navigation.navigate('AllFeaturedScreen')}
    />
  );
}
