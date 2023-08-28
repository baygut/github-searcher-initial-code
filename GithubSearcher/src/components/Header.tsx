import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Colors from '../utils/colors';
import Padding from '../utils/padding';
import Fonts from '../utils/fonts';


const Header = () => {
  return (
    <View style={styles.header}>
        <Image style={styles.image} resizeMode={"contain"} source={require("../../assets/images/open_brackett.png")} ></Image>
      <View style= {styles.text}>
        <Text style={styles.headerText}>Github Searcher</Text>
        <Text style={styles.descText}>find everything at light-speed</Text>
      </View>
      <Image style={styles.image} resizeMode={"contain"} source={require("../../assets/images/close_brackett.png")} ></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: Padding.medium,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.Primary,
    flexDirection: 'row',
  },
  text : {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.Secondary,
    fontFamily: Fonts.PoppinsBold,
  },
  descText: {
    fontSize: 12,
    fontFamily: Fonts.PoppinsLight,
    color: Colors.Secondary,
  },
  image: {
    width: 100,
    height: '100%'
  }
});

export default Header;
