import {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
} from 'react-native';

import Colors from '../../utils/colors';
import Padding from '../../utils/padding';
import Fonts from '../../utils/fonts';
import { RootStackParamList} from '../../../App';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export function DetailsView({route, navigation}: Props) {
  const data = route.params?.data;

  return (
    <SafeAreaView style={styles.safe}>
        <Text>{`${data}`}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.Secondary,
    height: '100%',
  },
  search_row: {
    flexDirection : 'row'
  },

  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: Colors.Light,
    borderRadius: 12,
    padding: 20,
    marginVertical: Padding.veryLow,
    marginHorizontal: Padding.low,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontFamily: Fonts.PoppinsLight,
    marginLeft: Padding.low,
  },
  icons: {
    backgroundColor: Colors.Secondary,
    padding: Padding.low,
    borderRadius: 24,
  },
  toggle : {
    justifyContent : 'center',
    marginRight : Padding.low,
    marginLeft : 'auto',
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
  image : {
    width : 24,
    height : 24,
    borderRadius : 24
  }
,
  desc : {
    fontFamily : Fonts.PoppinsLight,
    fontSize : 12,

    textAlign : 'center'
  }
});


