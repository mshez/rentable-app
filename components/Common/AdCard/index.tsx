import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { formatDistanceStrict } from 'date-fns';
import { Tile } from 'react-native-elements';
import SkeletonContent from 'react-native-skeleton-content';

import Colors from '../../../constants/Colors';
import { IListing } from '../../../interface';
import { View, Text } from '../../Themed';

interface Props {
  listing?: IListing;
  style?: object;
  loading?: boolean;
}

const styles = StyleSheet.create({
  MainContainer: {
    marginRight: 10,
    overflow: 'hidden',
  },
  tileBottom: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  address: {
    maxWidth: '50%',
    overflow: 'hidden',
    fontSize: 10,
  },
  date: {
    fontSize: 10,
  },
  listingTitle: {
    marginBottom: 5,
  },
  skeletonContainer: {
    marginRight: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const firstLayout = [
  {
    width: 150,
    height: 100,
    marginBottom: 5,
  },
];
const secondLayout = [
  {
    width: 150,
    height: 15,
    marginBottom: 5,
  },
];
export default function AdCard({ listing, style, loading }: Props) {
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  if (loading) {
    return (
      <View style={styles.skeletonContainer}>
        <SkeletonContent layout={firstLayout} isLoading />
        <SkeletonContent layout={secondLayout} isLoading />
        <SkeletonContent layout={secondLayout} isLoading />
      </View>
    );
  }
  return (
    <View style={[styles.MainContainer, style]}>
      <Tile
        imageSrc={{ uri: listing?.images[0] }}
        titleStyle={{
          fontSize: 15,
          fontFamily: 'Quicksand',
          color: (isDark && Colors.light.background) || Colors.dark.background,
        }}
        title={`Rs.${listing?.attributes.expected_price.toString()} / ${
          listing?.attributes.rent_per
        }`}
        contentContainerStyle={{ height: 80, width: 180 }}
        containerStyle={{ borderColor: '#a4a4a4', borderWidth: 1, borderRadius: 5 }}
        imageContainerStyle={{ borderTopLeftRadius: 5, borderTopEndRadius: 5 }}
        width={180}
        height={180}
      >
        <View style={styles.listingTitle}>
          <Text numberOfLines={1}>{listing?.title}</Text>
        </View>
        <View style={styles.tileBottom}>
          <Text numberOfLines={1} style={styles.address}>
            {listing?.location.address}
          </Text>
          <Text style={styles.date}>
            {formatDistanceStrict(new Date(listing?.created_at || ''), new Date(), {
              addSuffix: true,
            })}
          </Text>
        </View>
      </Tile>
    </View>
  );
}
