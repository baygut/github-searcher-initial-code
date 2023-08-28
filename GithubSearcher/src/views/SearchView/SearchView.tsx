import {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';


import Header from '../../components/Header';
import { SearchBar } from '../../components/SearchBar';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

type ItemProps = {title: string};

const Item = ({title}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export function SearchView(): JSX.Element {
  const [searched, setSearched] = useState('');

  return (
    <SafeAreaView style={styles.header}>
        <Header/>
      <SearchBar
              onChangeText={setSearched}
              value={searched}
              placeholder="Search a user or a repository..."
      />
      <View>
        <Text style={styles.header}>{searched}</Text>
      </View>
      <FlatList
  data={DATA}
  renderItem={({ item }) => {
    if (item.title.toUpperCase().includes(searched.toUpperCase())) {
      return <Item title={item.title} />;
    } else {
      return null; // or any other JSX you want to render for items that don't match the condition
    }
  }}
  keyExtractor={item => item.id}
/>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignContent: 'center',
    justifyContent: 'center',
  },

  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
