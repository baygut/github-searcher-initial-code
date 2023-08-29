import {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  Linking,
  Image,
  Touchable,
  TouchableOpacity,
} from 'react-native';

import Colors from '../../utils/colors';
import Padding from '../../utils/padding';
import Fonts from '../../utils/fonts';
import {RootStackParamList} from '../../../App';

import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NetworkAvatar} from '../../components/NetworkAvatar';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export function DetailsView({route, navigation}: Props) {
  const data = route.params?.data;
  const type = route.params?.type;

  const renderItem = ({item}: {item: any}) => <View style ={styles.links} >
                                                  <Text>{item}</Text>
                                              </View>;

  const openUrl = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.safe}>
      {type === 'user' ? (
        <View>
          <View style={styles.header}>
            <NetworkAvatar uri={`${data.avatar_url}`} size={100} />
            <View>
              <TouchableOpacity onPress={() => openUrl(data.html_url)}>
                <Text style={styles.text}> {`${data.login} 🔗`} </Text>
              </TouchableOpacity>
              <Text style={styles.text}> {`ID:  ${data.id}`} </Text>

            </View>
          </View>
          <Text style={styles.text} >Links</Text>
          <FlatList data={Object.values(data).slice(7)} renderItem={renderItem} ></FlatList>

        </View>
      ) : (
        <Text style={styles.text}></Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    alignContent: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.Light,
    height: '100%',
  },

  header: {
    alignContent: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.Light,
    padding: Padding.medium,
    margin: Padding.low,
    borderRadius: Padding.low,
    borderWidth: 5,
    borderColor: Colors.Dark,
    flexDirection: 'row',
  },
  text: {
    color: Colors.Primary,
    fontSize: 20,
    fontFamily: Fonts.PoppinsLight,
    marginLeft: Padding.low,
  },
});
