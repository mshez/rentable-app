import { useNavigation, useRoute } from '@react-navigation/native';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    paddingTop: 10,
    paddingBottom: 5,
    paddingHorizontal: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    width: '90%',
    height: 38,
    justifyContent: 'center',
  },
  search: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: '100%',
    justifyContent: 'center',
  },
  searchText: {
    color: '#666666',
    fontSize: 12,
    letterSpacing: 0.5,
    lineHeight: 14,
  },
});

const HomeHeader = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const handleClickSearch = () => {
    navigation.navigate('Search');
  };
  const { params } = route;
  // if (!(params && params.opacity && params.bgColor)) return null;
  // console.log(params.bgColor)
  return (
    <Animated.View
      style={{
        ...styles.container,
        // backgroundColor: params.bgColor,
        // elevation: params.elevation
      }}
    >
      <Animated.View
        style={{
          ...styles.searchContainer,
          // opacity: params.opacity,
        }}
      >
        <View
          style={{
            flex: 1,
            height: '100%',
            backgroundColor: '#fff',
            width: '100%',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#666666',
          }}
        >
          <TouchableOpacity activeOpacity={1} style={styles.search} onPress={() => {}}>
            <Text style={styles.searchText}>Search batik, sepatu kulit...</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

export default HomeHeader;
