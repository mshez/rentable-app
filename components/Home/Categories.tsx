import React from 'react';
import { StyleSheet, FlatList, useColorScheme } from 'react-native';
import { AntDesign, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import useGetTrendingCategories from '../../hooks/api/categories/useGetTrendingCategories';
import { View, Text } from '../Themed';
import { ICategory } from '../../interface';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '400',
    // color: 'white',
    marginBottom: 10,
    marginLeft: 15,
  },
  item: {
    // backgroundColor: '#f9c2ff',
    // padding: 20,
    // marginVertical: 8,
    marginHorizontal: 5,
    width: 150,
    height: 100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

const renderCategoryIcon = (id: number, isDark: boolean): React.ReactElement | null => {
  if (id === 37) {
    return (
      <MaterialCommunityIcons
        name="book-open-outline"
        size={24}
        color={(isDark && 'white') || 'black'}
      />
    );
  }
  if (id === 43) {
    return <Ionicons name="ios-bed" size={24} color={(isDark && 'white') || 'black'} />;
  }
  if (id === 12) {
    return <AntDesign name="car" size={24} color={(isDark && 'white') || 'black'} />;
  }
  if (id === 21) {
    return <AntDesign name="car" size={24} color={(isDark && 'white') || 'black'} />;
  }
  if (id === 1) {
    return <AntDesign name="car" size={24} color={(isDark && 'white') || 'black'} />;
  }
  if (id === 29) {
    return <FontAwesome5 name="building" size={24} color={(isDark && 'white') || 'black'} />;
  }
  return null;
};

const CategoryItem = ({ category }: { category: ICategory }) => {
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  return (
    <View
      style={[
        {
          borderWidth: 1,
          borderColor: (isDark && Colors.light.background) || Colors.dark.background,
        },
        styles.item,
      ]}
    >
      {renderCategoryIcon(category.id, isDark)}
      <Text style={{ marginTop: 10, textAlign: 'center' }}>{category.name}</Text>
    </View>
  );
};

export default function Categories() {
  const { categories, isLoading } = useGetTrendingCategories();

  const renderItem = ({ item }: { item: ICategory }) => {
    return <CategoryItem category={item} />;
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.title}>Categories</Text>
      {(!isLoading && (
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={categories}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        />
      )) || <Text style={styles.title}>Loading</Text>}
    </View>
  );
}
