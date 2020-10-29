import React from 'react';
import { StyleSheet, FlatList, useColorScheme, TouchableOpacity } from 'react-native';
import { AntDesign, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { View, Text } from '../Themed';
import { ICategory } from '../../types/interface';
import Colors from '../../constants/Colors';
import useGetAllCategories from '../../hooks/api/categories/useGetAllCategories';

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '400',
    // color: 'white',
    marginBottom: 10,
    marginLeft: 15,
  },
  item: {
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
    return <AntDesign name="woman" size={24} color={(isDark && 'white') || 'black'} />;
  }
  if (id === 1) {
    return <AntDesign name="mobile1" size={24} color={(isDark && 'white') || 'black'} />;
  }
  if (id === 29) {
    return <FontAwesome5 name="building" size={24} color={(isDark && 'white') || 'black'} />;
  }
  return null;
};

const CategoryItem = ({ category }: { category: ICategory }) => {
  const theme = useColorScheme();
  const { navigate } = useNavigation();
  const isDark = theme === 'dark';
  return (
    <TouchableOpacity
      onPress={() => navigate('ChildCategoryScreen', { name: category.name, slug: category.slug })}
      style={[
        {
          borderWidth: 1,
          borderColor: (isDark && Colors.light.background) || Colors.dark.background,
          borderRadius: 3,
        },
        styles.item,
      ]}
    >
      {renderCategoryIcon(category.id, isDark)}
      <Text style={{ marginTop: 10, textAlign: 'center' }}>{category.name}</Text>
    </TouchableOpacity>
  );
};

export default function Categories() {
  const { categories, isLoading } = useGetAllCategories();

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
