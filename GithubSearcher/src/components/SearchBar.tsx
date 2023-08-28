import React, {useState} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';

import SearchIcon from '../../assets/icons/SearchIcon';
import CancelIcon from '../../assets/icons/Cancelcon';
import Colors from '../utils/colors';
import Padding from '../utils/padding';
import { TouchableOpacity } from "react-native";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const handleCancel = (onChangeText : (text: string)=>void) => {
    onChangeText("");
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search...',
}: SearchBarProps): JSX.Element {
  return (
    <View style={styles.main}>
      <View style={styles.searchIcon} ><SearchIcon color={Colors.Dark} size={Padding.medium} /></View>
      <TextInput
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
      />
      {
        value ? <TouchableOpacity onPress={()=> handleCancel(onChangeText)} style={styles.cancelIcon} ><CancelIcon color={Colors.Dark} size={Padding.medium}/></TouchableOpacity> : null
      }
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: Padding.low,
    backgroundColor: `${Colors.Light}`,
    marginHorizontal: Padding.low,
    marginVertical : Padding.low,
    borderRadius: 12,
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  cancelIcon : {
    marginLeft: 'auto'
  }
  ,
  searchIcon : {
    marginRight: Padding.low,
  }
});
