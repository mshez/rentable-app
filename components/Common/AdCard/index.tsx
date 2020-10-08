import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import Colors from '../../../constants/Colors';
import { IListing } from '../../../interface';
import Text from '../../StyledText';

interface Props {
  listing: IListing;
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    borderRadius: 5,
    padding: 0,
    borderColor: '#000',
  },
  image: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});
export default function AdCard({ listing }: Props) {
  const theme = useColorScheme();
  return (
    <Card
      containerStyle={[
        styles.container,
        {
          backgroundColor: (theme === 'dark' && Colors.dark.background) || Colors.light.background,
        },
      ]}
    >
      {/* <Card.Divider /> */}
      <Card.Image style={styles.image} source={{ uri: listing.images[0] }} />
      {/* <Text style={{ marginBottom: 10 }}>{listing.short_description}</Text> */}
      {/* <Button
        icon={<Icon name="code" color="#ffffff" />}
        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
        title="View details"
      /> */}
      <Card.Title>
        <Text style={{ fontWeight: '300' }}>{listing.title}</Text>
      </Card.Title>
    </Card>
  );
}
