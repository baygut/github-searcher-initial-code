import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
  } from 'react-native';

  import type {PropsWithChildren} from 'react';


  


type SectionProps = PropsWithChildren<{
    title: string;
  }>;
  
  export function Section({children, title}: SectionProps): JSX.Element {

    return (
      <View>
        <Text>
          {title}
        </Text>
        <Text>
          {children}
        </Text>
      </View>
    );
  }