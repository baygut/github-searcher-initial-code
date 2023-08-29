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
import {UserLink} from '../../components/Links';
import {openUrl} from '../../functions/openUrl'

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export function DetailsView({route, navigation}: Props) {
  const data = route.params?.data;
  const type = route.params?.type;

  const renderItem = ({item}: {item: any}) => (
    <UserLink onPress={() => openUrl(item)} text={item}></UserLink>
  );


  return (
    <SafeAreaView style={styles.safe}>
      {type === 'user' ? (
        <View style={styles.page}>
          <View style={styles.header}>
            <NetworkAvatar uri={`${data.avatar_url}`} size={100} />
            <View>
              <TouchableOpacity onPress={() => openUrl(data.html_url)}>
                <Text style={styles.text}> {`${data.login} 🔗`} </Text>
              </TouchableOpacity>
              <Text style={styles.text}> {`ID:  ${data.id}`} </Text>
            </View>
          </View>

          <Text style={styles.text}>Links</Text>
          <FlatList
            data={Object.values(data).slice(7, -3)}
            renderItem={renderItem}></FlatList>
        </View>
      ) : (
        <View style={styles.page}>
          <View style={styles.header}>
            <View>
              <TouchableOpacity onPress={() => openUrl(data.html_url)}>
                <Text style={styles.text}> {`${data.full_name} 🔗`} </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openUrl(data.html_url)}>
                <Text style={styles.text}> {`${data.owner.login} 🔗`} </Text>
              </TouchableOpacity>
              <Text style={styles.small_text}>
                {' '}
                {`Description:  ${data.description}`}{' '}
              </Text>
            </View>
          </View>

          <Text style={styles.text}>Links</Text>
          <FlatList
            data={Object.values(data).slice(10, -35)}
            renderItem={renderItem}></FlatList>
        </View>
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
  page: {
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
  links: {
    backgroundColor: Colors.Dark,
    padding: Padding.low,
    margin: Padding.veryLow,
    borderRadius: Padding.low,
  },

  text: {
    color: Colors.Primary,
    fontSize: 20,
    fontFamily: Fonts.PoppinsLight,
    marginLeft: Padding.low,
  },

  small_text: {
    color: Colors.Primary,
    fontSize: 10,
    fontFamily: Fonts.PoppinsLight,
    marginLeft: Padding.low,
  },
  link_text: {
    color: Colors.Secondary,
    fontFamily: Fonts.PoppinsLight,
  },
});
