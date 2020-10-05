import * as React from 'react';
import { StyleSheet,ScrollView } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {Button, Card, Icon} from "react-native-elements";

export default function HomeScreen() {
  return (
    <View style={styles.container}>    
      <ScrollView >          
      <Card>
        <Card.Title>HELLO WORLD</Card.Title>
        <Card.Divider/>
        <Card.Image source={{uri:'https://assets-rentable.sgp1.digitaloceanspaces.com/rentablepk/images/p2csX4KNVgydyExHVFk7MOl0dlAUzoNbLoSCeCss.jpeg'}} />
        <Text style={{marginBottom: 10}}>
          The idea with React Native Elements is more about component structure than actual design.
        </Text>
        <Button
            icon={<Icon name='code' color='#ffffff' />}
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='VIEW NOW' />
      </Card>
      <Card>
        <Card.Title>HELLO WORLD</Card.Title>
        <Card.Divider/>
        <Card.Image source={{uri:'https://assets-rentable.sgp1.digitaloceanspaces.com/rentablepk/images/p2csX4KNVgydyExHVFk7MOl0dlAUzoNbLoSCeCss.jpeg'}} />
        <Text style={{marginBottom: 10}}>
          The idea with React Native Elements is more about component structure than actual design.
        </Text>
        <Button
            icon={<Icon name='code' color='#ffffff' />}
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='VIEW NOW' />
      </Card>      
    </ScrollView>  
    </View>
  );
}

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
});
