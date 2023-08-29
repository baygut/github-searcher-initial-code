
import React from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

const FilterIcon: React.FC<IconProps> = ({size = 24, color = 'black'}) => {
  return (
    <View style={{width: size, height: size}}>
      <Svg width={size} height={size} viewBox="0 0 32 32" fill={"none"}>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M29 13.858V31a1 1 0 11-2 0V13.858c-1.721-.447-3-1.999-3-3.858s1.279-3.411 3-3.858V1a1 1 0 112 0v5.142c1.721.447 3 1.999 3 3.858s-1.279 3.411-3 3.858zM28 8c-1.102 0-2 .897-2 2s.898 2 2 2c1.103 0 2-.897 2-2s-.897-2-2-2zM17 25.858V31a1 1 0 11-2 0v-5.142c-1.721-.447-3-1.999-3-3.858s1.279-3.411 3-3.858V1a1 1 0 112 0v17.142c1.721.447 3 1.999 3 3.858s-1.279 3.411-3 3.858zM16 20c-1.103 0-2 .898-2 2 0 1.102.897 2 2 2s2-.898 2-2c0-1.102-.897-2-2-2zm-11-.142V31a1 1 0 11-2 0V19.858C1.279 19.411 0 17.859 0 16s1.279-3.411 3-3.858V1a1 1 0 112 0v11.142c1.721.447 3 1.999 3 3.858s-1.279 3.411-3 3.858zM4 14c-1.102 0-2 .898-2 2 0 1.103.898 2 2 2 1.102 0 2-.897 2-2 0-1.102-.898-2-2-2z"
          fill={color}
        />
      </Svg>
    </View>
  );
};

export default FilterIcon;
