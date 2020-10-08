import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import MyAdsScreen from '../screens/MyAdsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RentScreen from '../screens/RentScreen';

import { BottomTabParamList, HomeParamList, FavouritesParamList,RentParamList,MyAdsParamList,SettingsParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Home"
        component={HomeTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Favourites"
        component={FavouritesTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Rent"
        component={RentTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="MyAds"
        component={MyAdsTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

function HomeTabNavigator() {
  return (
    <HomeStack.Navigator headerMode="float">
      <HomeStack.Screen
        name="HomeScreen"        
        component={HomeScreen}
        options={{ headerTitle: 'Home' }}
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
