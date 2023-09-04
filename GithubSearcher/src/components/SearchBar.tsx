import React, { useEffect, useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

import SearchIcon from '../../assets/icons/SearchIcon';
import CancelIcon from '../../assets/icons/Cancelcon';
import Colors from '../utils/colors';
import Padding from '../utils/padding';
import { TouchableOpacity } from 'react-native';
import FilterIcon from '../../assets/icons/FilterIcon';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onSubmitEditing: () => void;
  onFilterTapped: () => void;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search...',
  onSubmitEditing,
  onFilterTapped,
}: SearchBarProps): JSX.Element {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const handleCancel = () => {
    onChangeText('');
  };

  const debounce = (text: string) => {
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      onSubmitEditing();
    }, 1000);

    setTimer(newTimer);
  };

  useEffect(() => {
    debounce(value);
  }, [value]);

  return (
    <View style={styles.main}>
      <View style={styles.searchIcon}>
        <SearchIcon color={Colors.Dark} size={Padding.medium} />
      </View>
      <TextInput
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
      />
      <View style={styles.iconRow}>
        {value ? (
          <TouchableOpacity onPress={handleCancel} style={styles.cancelIcon}>
            <CancelIcon color={Colors.Dark} size={Padding.medium} />
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity onPress={onFilterTapped}>
          <FilterIcon color={Colors.Dark} size={Padding.medium} />
        </TouchableOpacity>
      </View>
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
    marginVertical: Padding.low,
    borderRadius: 12,
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  cancelIcon: {
    marginRight: Padding.low,
  },
  searchIcon: {
    marginRight: Padding.low,
  },
  iconRow: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
});
