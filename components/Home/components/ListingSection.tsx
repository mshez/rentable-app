import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Button } from 'react-native-elements';

import { IListing } from '../../../interface';
import AdCard from '../../Common/AdCard';
import { View, Text } from '../../Themed';

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
    marginLeft: 15,
  },
  section: {
    marginTop: 20,
  },
  sectionHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 20,
  },
  item: {
    marginHorizontal: 16,
    width: 150,
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
type ListingSection = {
  sectionTitle: string;
  listings: IListing[] | null;
  viewMoreHandler: () => void;
};
export default function ListingSection({
  sectionTitle,
  listings,
  viewMoreHandler,
}: ListingSection) {
  const renderItem = ({ item }: { item: IListing }) => <AdCard listing={item} />;
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.title}>{sectionTitle}</Text>
        <Button
          onPress={viewMoreHandler}
          title="view more"
          titleStyle={{ fontFamily: 'Quicksand', fontSize: 13 }}
          buttonStyle={{ padding: 5 }}
        />
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={listings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => {
          return (
            <>
              <AdCard loading />
              <AdCard loading />
              <AdCard loading />
            </>
          );
        }}
      />
    </View>
  );
}
