import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Colors from '../utils/colors';
import Fonts from '../utils/fonts';
import Padding from '../utils/padding';

interface Props {
  onPress: () => void;
  text: string;
}

export function UserLink({onPress, text}: Props): JSX.Element {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.links}>
        <Text style={styles.link_text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  links: {
    backgroundColor: Colors.Dark,
    padding: Padding.low,
    margin: Padding.veryLow,
    borderRadius: Padding.low,
  },

  link_text: {
    color: Colors.Secondary,
    fontFamily: Fonts.PoppinsLight,
  },
});
