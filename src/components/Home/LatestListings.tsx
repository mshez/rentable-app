import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { IListing } from '../../types/interface';
import ListingSection from './components/ListingSection';

type LatestListings = {
  listings: IListing[] | null;
};
export default function LatestListings({ listings }: LatestListings) {
  const navigation = useNavigation();
  return (
    <ListingSection
      listings={listings}
      sectionTitle="Latest listings"
      viewMoreHandler={() => navigation.navigate('AllLatestScreen')}
    />
  );
}
