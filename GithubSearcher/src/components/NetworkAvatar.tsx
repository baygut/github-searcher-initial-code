import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface Props {
  uri: string;
  size? : number;
}

export function NetworkAvatar({
  uri,
  size = 24,
}: Props): JSX.Element {
  return (
    <Image
      source={{ uri: uri }}
      style={{

        height: size,
        width: size,
        borderRadius: size / 2, // Adjust the borderRadius based on width
      }}
      resizeMode={'contain'}
    />
  );
}
