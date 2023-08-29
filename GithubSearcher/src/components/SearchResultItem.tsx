import React from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity, View, Text} from 'react-native';
import Colors from '../utils/colors';
import RepoSwitchIcon from '../../assets/icons/RepoSwitchIcon';
import Fonts from '../utils/fonts';
import Padding from '../utils/padding';
import {NetworkAvatar} from './NetworkAvatar';

type ItemProps = {
  title: string;
  color: string;
  type: string;
  uri: string;
  onTap: () => void;
};

export function SeachResultItem({title, color, type, uri, onTap}: ItemProps) : JSX.Element {
    return(
  <TouchableOpacity activeOpacity={0.7} onPress={onTap}>
    <View style={styles.item}>
      <View style={styles.icons}>
        {type !== 'user' ? (
          <RepoSwitchIcon color={color} />
        ) : (
          <NetworkAvatar uri={uri}></NetworkAvatar>
        )}
      </View>
      <Text style={styles.title} ellipsizeMode={'tail'} numberOfLines={1}>
        {title}
      </Text>

      <View style={styles.type}>
        <Text style={styles.type_title}> {type.toUpperCase()} </Text>
      </View>
    </View>
  </TouchableOpacity>);

        }

const styles = StyleSheet.create({
  item: {
    backgroundColor: Colors.Light,
    borderRadius: 12,
    padding: 20,
    marginVertical: Padding.veryLow,
    marginHorizontal: Padding.low,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icons: {
    backgroundColor: Colors.Secondary,
    padding: Padding.low,
    borderRadius: 24,
  },
  type: {
    marginLeft: 'auto',
    backgroundColor: Colors.Primary,
    borderRadius: 10,
    padding: Padding.veryLow,
  },

  title: {
    fontSize: 15,
    fontFamily: Fonts.PoppinsLight,
    marginLeft: Padding.low,
    paddingRight: 'auto',
    width: '70%',
  },
  type_title: {
    fontSize: 10,
    fontFamily: Fonts.KanitBold,
    color: Colors.Secondary,
  },
  
});
