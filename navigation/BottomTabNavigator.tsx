import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { SearchBar } from 'react-native-elements';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import AllLatestScreen from '../screens/Home/AllLatestScreen';
import AllFeaturedScreen from '../screens/Home/AllFeaturedScreen';
import AllWantedScreen from '../screens/Home/AllWantedScreen';
import ChildCategoryScreen from '../screens/Category/ChildCategoryScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import MyAdsScreen from '../screens/MyAdsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RentScreen from '../screens/RentScreen';
import SearchScreen from '../screens/Home/SearchScreen';

import {
  BottomTabParamList,
  HomeParamList,
  FavouritesParamList,
  RentParamList,
  MyAdsParamList,
  SettingsParamList,
} from '../types';

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
// function TabBarIcon(props: { name: string; color: string }) {
//   return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
// }
function TabBarAntDesignIcon(props: { name: string; color: string }) {
  return <AntDesign size={20} style={{ marginBottom: -4 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

function HomeTabNavigator() {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{}} />
      <HomeStack.Screen
        name="AllFeaturedScreen"
        component={AllFeaturedScreen}
        options={{ headerTitle: 'Featured listings' }}
      />
      <HomeStack.Screen
        name="AllLatestScreen"
        component={AllLatestScreen}
        options={{ headerTitle: 'Latest listings' }}
      />
      <HomeStack.Screen
        name="AllWantedScreen"
        component={AllWantedScreen}
        options={{ headerTitle: 'Wanted listings' }}
      />
      <HomeStack.Screen
        name="ChildCategoryScreen"
        component={ChildCategoryScreen}
        options={({ route }: any) => ({ headerTitle: route?.params?.name || '' })}
      />
      <HomeStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerTitle: 'Search listings' }}
      />
    </HomeStack.Navigator>
  );
}

const FavouritesTabStack = createStackNavigator<FavouritesParamList>();

function FavouritesTabNavigator() {
  return (
    <FavouritesTabStack.Navigator>
      <FavouritesTabStack.Screen
        name="FavouritesScreen"
        component={FavouriteScreen}
        options={{ headerTitle: 'Favourite listings' }}
      />
    </FavouritesTabStack.Navigator>
  );
}

const RentTabStack = createStackNavigator<RentParamList>();
function RentTabNavigator() {
  return (
    <RentTabStack.Navigator>
      <RentTabStack.Screen
        name="RentScreen"
        component={RentScreen}
        options={{ headerTitle: 'Rent' }}
      />
    </RentTabStack.Navigator>
  );
}

const MyAdsTabStack = createStackNavigator<MyAdsParamList>();
function MyAdsTabNavigator() {
  return (
    <MyAdsTabStack.Navigator>
      <MyAdsTabStack.Screen
        name="MyAdsScreen"
        component={MyAdsScreen}
        options={{ headerTitle: 'My Ads' }}
      />
    </MyAdsTabStack.Navigator>
  );
}

const SettingsTabStack = createStackNavigator<SettingsParamList>();
function SettingsTabNavigator() {
  return (
    <SettingsTabStack.Navigator>
      <SettingsTabStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerTitle: 'Settings' }}
      />
    </SettingsTabStack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarAntDesignIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Favourites"
        component={FavouritesTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarAntDesignIcon name="hearto" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Rent"
        component={RentTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarAntDesignIcon name="pluscircleo" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="MyAds"
        component={MyAdsTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarAntDesignIcon name="profile" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarAntDesignIcon name="setting" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}
