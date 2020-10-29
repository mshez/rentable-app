import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { StyleSheet, SafeAreaView, RefreshControl, useColorScheme } from 'react-native';
import { SearchBar, ThemeContext } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useDebouncedCallback } from 'use-debounce';
import { useNavigation } from '@react-navigation/native';

import config from '../utils/config';
import { ScrollView, Text, View } from '../components/Themed';
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

interface HomeScreenProps {}
export default function HomeScreen({}: HomeScreenProps) {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  const searchInput = useRef(null);

  const [location, setLocation] = React.useState<null | string>(null);
  const { refetch: RefetchLatest, listings: NewListings } = useGetLatestListings();
  const { refetch: RefetchFeatured, listings: NewFeaturedListings } = useGetFeaturedListings();
  const [refreshing, setRefreshing] = React.useState(false);
  const themeMode = useColorScheme();
  const [searchText, setSearchText] = React.useState('');

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await RefetchLatest;
    await RefetchFeatured;
    setRefreshing(false);
  }, [RefetchLatest, RefetchFeatured]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        // setErrorMsg('Permission to access location was denied');
        setLocation('Please activate location');
      }
      const locationResponse = await Location.getCurrentPositionAsync({});
      await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${locationResponse.coords.latitude},${locationResponse.coords.longitude}&key=${config.googleAPIKey2}&location_type=APPROXIMATE&result_type=administrative_area_level_1|administrative_area_level_2`
      )
        .then((response) => response.json())
        .then((responseJson) => {
          setLocation(responseJson.results[0].formatted_address);
        });
    })();
    return () => {
      // console.log('iam logged');
      // searchInput.current.focus();
    };
  }, [searchInput]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSearchText('');
    });

    return unsubscribe;
  }, [navigation]);

  // Debounce callback
  const debounced = useDebouncedCallback(
    // function
    () => {
      navigation.navigate({
        name: 'SearchScreen',
        params: {
          keyword: searchText,
          location,
        },
      });
    },
    // delay in ms
    1000
  );
  const handleSearchText = useCallback(
    (text) => {
      setSearchText(text);
      debounced.callback();
    },
    [debounced]
  );

  return (
    <SafeAreaView style={[styles.container]}>
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
          <Text style={{ marginLeft: 5 }}>{location || 'Pakistan'}</Text>
        </View>
        <SearchBar
          ref={searchInput}
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
          // round
          lightTheme={themeMode !== 'dark'}
          placeholder="Type Here..."
          onChangeText={handleSearchText}
          // onFocus={() => navigation.navigate('SearchScreen')}
          value={searchText}
        />
      </View>
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
