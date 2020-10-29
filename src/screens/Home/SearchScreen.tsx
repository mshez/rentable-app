import { FontAwesome } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, useColorScheme, FlatList } from 'react-native';
import { SearchBar, ThemeContext } from 'react-native-elements';
import { useDebouncedCallback } from 'use-debounce';

import { SafeAreaView, Text, View } from '../../components/Themed';
import useSearchListings from '../../hooks/api/listings/useSearchListings';
import AdCard from '../../components/Common/AdCard';
import { IListing } from '../../types/interface';
import { useRoute } from '@react-navigation/native';
import { HomeParamList } from '../../types/types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default function SearchScreen() {
  const route = useRoute<RouteProp<HomeParamList, 'SearchScreen'>>();
  const { theme } = React.useContext(ThemeContext);
  const themeMode = useColorScheme();
  const [searchText, setSearchText] = React.useState(route.params.keyword);
  const [realSearchText, setRealSearchText] = React.useState(route.params.keyword);
  const [page, setPage] = React.useState(1);
  const shouldFetch = `/search?to_search=${searchText}&page=${page}`;
  const { Listings, isLoading } = useSearchListings(shouldFetch, page);

  // Debounce callback
  const debounced = useDebouncedCallback(
    // function
    (text) => {
      setSearchText(text);
    },
    // delay in ms
    1000
  );
  const handleSearchText = React.useCallback(
    (text) => {
      setRealSearchText(text);
      debounced.callback(text);
    },
    [debounced]
  );

  const renderItem = ({ item }: { item: IListing }) => <AdCard listing={item} />;

  return (
    <SafeAreaView style={[styles.container, { height: '100%' }]}>
      <View style={{ width: '100%' }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            paddingBottom: 0,
          }}
        >
          <FontAwesome
            name="map-marker"
            size={16}
            color={
              (themeMode === 'dark' && theme.colors?.light?.primary) || theme.colors?.dark?.primary
            }
          />
          <Text style={{ marginLeft: 5 }}>{route?.params?.location || 'Pakistan'}</Text>
        </View>
        <SearchBar
          platform="default"
          containerStyle={{
            borderWidth: 0,
            backgroundColor:
              (themeMode === 'dark' && theme.colors?.dark?.primary) || theme.colors?.light?.primary,
            borderTopWidth: 0,
            borderBottomColor:
              (themeMode === 'dark' && theme.colors?.dark?.secondary) ||
              theme.colors?.light?.secondary,
          }}
          inputContainerStyle={{
            backgroundColor:
              (themeMode === 'dark' && theme.colors?.dark?.secondary) ||
              theme.colors?.light?.secondary,
          }}
          inputStyle={{
            color: theme.colors?.light?.primary,
          }}
          lightTheme={themeMode !== 'dark'}
          placeholder="Type Here..."
          onChangeText={handleSearchText}
          value={realSearchText}
        />
      </View>
      <FlatList
        initialNumToRender={8}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={Listings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReachedThreshold={0.01}
        onEndReached={() => {
          setPage((p) => p + 1);
        }}
        onRefresh={() => {
          setPage(1);
        }}
        refreshing={isLoading}
      />
    </SafeAreaView>
  );
}
