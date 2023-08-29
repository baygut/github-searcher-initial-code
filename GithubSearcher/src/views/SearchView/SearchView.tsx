import {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
} from 'react-native';
import RepoIcon from '../../../assets/icons/RepoIcon';
import UserIcon from '../../../assets/icons/UserIcon';
import UserService from '../../services/user-service/UserService';

import Header from '../../components/Header';
import {SearchBar} from '../../components/SearchBar';
import Colors from '../../utils/colors';

import generateRandomColor from '../../functions/randomColorGenerator';
import Padding from '../../utils/padding';
import Fonts from '../../utils/fonts';


import { UserResponse } from '../../services/user-service/UserModel';
import { Repo, RepoResponse } from '../../services/repo-service/RepoModel';
import RepoService from '../../services/repo-service/RepoService';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    type: 'repo',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    type: 'user',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    type: 'repo',
  },
];

type ItemProps = {title: string; color: string; type: string};

const Item = ({title, color, type}: ItemProps) => (
  <View style={styles.item}>
    <View style={styles.icons}>
      {type === 'user' ? (
        <UserIcon color={color} />
      ) : (
        <RepoIcon color={color} />
      )}
    </View>
    <Text style={styles.title}>{title}</Text>

    <View style={styles.type}>
      <Text style={styles.type_title}> {type.toUpperCase()} </Text>
    </View>
  </View>
);

export function SearchView(): JSX.Element {
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState<UserResponse>();
    const [repos, setRepos] = useState<RepoResponse>();

    const onSubmitEditing = () => {
        const fetchResults = async ()=> {
            const userResponse = await RepoService.fetchRepos(query);
            userResponse && setRepos(userResponse);
            const repoResponse = await UserService.fetchUsers(query);
            repoResponse && setUsers(repoResponse);
        }
        fetchResults();
        console.log(users?.items);
        console.log(repos);
    }
    



  return (
    <SafeAreaView style={styles.safe}>
      <Header />
      <SearchBar
        onChangeText={setQuery}
        onSubmitEditing = {onSubmitEditing}
        value={query}
        placeholder="Search a user or a repository..."
      />
      <View></View>
      <FlatList
        data={DATA}
        renderItem={({item}) => {
          if (item.title.toUpperCase().includes(query.toUpperCase())) {
            return (
              <Item
                type={item.type}
                color={generateRandomColor()}
                title={item.title}
              />
            );
          } else {
            return null;
          }
        }}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.Secondary,
    height: '100%',
  },

  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: Colors.Light,
    borderRadius: 12,
    padding: 20,
    marginVertical: Padding.veryLow,
    marginHorizontal: Padding.low,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontFamily: Fonts.PoppinsLight,
    marginLeft: Padding.low,
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
  type_title: {
    fontSize: 10,
    fontFamily: Fonts.KanitBold,
    color: Colors.Secondary,
  },
});
function useCallback(arg0: (newQuery: any) => void, arg1: never[]) {
    throw new Error('Function not implemented.');
}

