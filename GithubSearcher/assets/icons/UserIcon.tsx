import React from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

const UserIcon: React.FC<IconProps> = ({size = 24, color = 'black'}) => {
  return (
    <View style={{width: size, height: size}}>
      <Svg width={size} height={size} viewBox="0 0 16 16" fill={"none"}>
        <Path
          fill={color}
          fillRule="evenodd"
          d="M2 5.5a3.5 3.5 0 115.898 2.549 5.508 5.508 0 013.034 4.084.75.75 0 11-1.482.235 4 4 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.493 3.493 0 012 5.5zM11 4a3.001 3.001 0 012.22 5.018 5.01 5.01 0 012.56 3.012.749.749 0 01-.885.954.752.752 0 01-.549-.514 3.507 3.507 0 00-2.522-2.372.75.75 0 01-.574-.73v-.352a.75.75 0 01.416-.672A1.5 1.5 0 0011 5.5.75.75 0 0111 4zm-5.5-.5a2 2 0 10-.001 3.999A2 2 0 005.5 3.5z"
          clipRule="evenodd"
        />
      </Svg>
    </View>
  );
};

export default UserIcon;
