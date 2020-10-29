import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { View, Text, useColorScheme } from 'react-native';
import { SearchBar, ThemeContext } from 'react-native-elements';

interface Props {
  searchText: string;
  setSearchText: (text: string) => void;
  location: string | null;
}

const HomeScreenHeader = ({ searchText, setSearchText, location }: Props) => {
  const { theme } = React.useContext(ThemeContext);
  const themeMode = useColorScheme();

  return (
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
        platform="default"
        containerStyle={{
          borderWidth: 0,
          backgroundColor:
            (themeMode === 'dark' && theme.colors?.dark?.primary) || theme.colors?.light?.primary,
          borderTopWidth: 0,
          borderBottomColor:
            (themeMode === 'dark' && theme.colors?.dark?.secondary) || theme.colors?.light?.secondary,
        }}
        inputContainerStyle={{
          backgroundColor:
            (themeMode === 'dark' && theme.colors?.dark?.secondary) || theme.colors?.light?.secondary,
        }}
        inputStyle={{ color: theme.colors?.light?.primary }}
        lightTheme={themeMode !== 'dark'}
        placeholder="Type Here..."
        onChangeText={setSearchText}
        value={searchText}
      />
    </View>
  );
};
export default HomeScreenHeader;
