import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  Text,
  Switch,
  Settings,
} from 'react-native';
import Colors from '../../utils/colors';

import Padding from '../../utils/padding';
import Fonts from '../../utils/fonts';
import {useRoute, RouteProp} from '@react-navigation/native';
import {useContext, useState} from 'react';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList} from '../../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;
export function SettingsView({route, navigation}: Props) {
  const { userSwitch, setUserSwitch, repoSwitch, setRepoSwitch } = route.params;

   const handleUserSwitch = (newValue: boolean) => {
    setUserSwitch(newValue);
    navigation.goBack();
  };
  const handleRepoSwitch = (newValue: boolean) => {
    setRepoSwitch(newValue);
    navigation.goBack();
  };


  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.header}>
        You can change the scope of the search here.
      </Text>
      <View style={styles.set}>
        <View style={styles.settings}>
          <Text style={styles.text}>Users</Text>
          <Switch value={userSwitch} onValueChange ={handleUserSwitch} ></Switch>
        </View>
        <View style={styles.settings}>
          <Text style={styles.text}>Repos</Text>
          <Switch value={repoSwitch} onValueChange ={handleRepoSwitch} ></Switch>
        </View>

      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safe: {
    backgroundColor: Colors.Primary,
    height: '100%',
  },
  header: {
    fontFamily: Fonts.PoppinsLight,
    fontSize: 15,
    margin: Padding.medium,
    color: Colors.Secondary,
  },

  settings: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.Dark,
    margin: Padding.low,
    padding: Padding.veryLow,
    borderRadius: 12,
    width: '95%',
  },
  set: {
    flexDirection: 'column',

    alignItems: 'center',

    backgroundColor: Colors.Dark,

    borderRadius: 12,
  },
  text: {
    fontFamily: Fonts.PoppinsLight,
    marginLeft: Padding.low,
    color: Colors.Secondary,
  },
  icons: {
    backgroundColor: Colors.Secondary,
    padding: Padding.low,
    borderRadius: 24,
  },
  toggle: {
    justifyContent: 'center',
    marginRight: Padding.low,
    marginLeft: 'auto',
  },
  type: {
    marginLeft: 'auto',
    backgroundColor: Colors.Primary,
    borderRadius: 10,
    padding: Padding.veryLow,
  },
  type_title: {
    fontSize: 10,
    fontFamily: Fonts.KanitBold,
    color: Colors.Secondary,
  },
  image: {
    width: 24,
    height: 24,
    borderRadius: 24,
  },
});

