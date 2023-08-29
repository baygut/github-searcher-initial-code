import {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';

import RepoSwitchIcon from '../../../assets/icons/RepoSwitchIcon';
import UserService from '../../services/user-service/UserService';

import Header from '../../components/Header';
import {SearchBar} from '../../components/SearchBar';
import Colors from '../../utils/colors';

import {stringToColor} from '../../functions/stringToColor';
import Padding from '../../utils/padding';
import Fonts from '../../utils/fonts';

import {User, UserResponse} from '../../services/user-service/UserModel';
import {Repo, RepoResponse} from '../../services/repo-service/RepoModel';
import RepoService from '../../services/repo-service/RepoService';

import {useNavigation} from '@react-navigation/native';

type ItemProps = {title: string; color: string; type: string; uri: string, onTap : ()=> void};

const Item = ({title, color, type, uri, onTap}: ItemProps) => (
    <TouchableOpacity activeOpacity={0.7} >
          <View style={styles.item}>
    <View style={styles.icons}>
      {type !== 'user' ? (
        <RepoSwitchIcon color={color} />
      ) : (
        <Image
          source={{uri: uri}}
          style={styles.image}
          resizeMode={'contain'}></Image>
      )}
    </View>
    <Text style={styles.title}>{title}</Text>

    <View style={styles.type}>
      <Text style={styles.type_title}> {type.toUpperCase()} </Text>
    </View>
  </View>
    </TouchableOpacity>
);

//repo presents true, users presents tru
export function SearchView(): JSX.Element {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<UserResponse>();
  const [repos, setRepos] = useState<RepoResponse>();
  const [duration, setDuration] = useState(0);
  const navigation = useNavigation();
  


  const onSubmitEditing = () => {
    const fetchResults = async () => {
      if (query) {
        const start = Date.now();
        const repoResponse = await RepoService.fetchRepos(query);
        const userResponse = await UserService.fetchUsers(query);
        const end = Date.now();
        setDuration(end - start);
        if ('error' in repoResponse) {
          console.error('An error occurred:', repoResponse.error); //TODO!
        } else if ('error' in userResponse) {
          console.error('An error occurred:', userResponse.error); //TODO!
        } else {
          setRepos(repoResponse);
          setUsers(userResponse);
        }
      }
    };
    fetchResults();
  };

  type ListItem = User | Repo; // Common interface for

  const combinedList: ListItem[] = [
    ...(users?.items ?? []),
    ...(repos?.items ?? []),
  ];
  const [userSwitch, setUserSwitch] = useState(true);
  const [repoSwitch, setRepoSwitch] = useState(true);

  return (
    <SafeAreaView style={styles.safe}>
      <Header />
      <Text>{`${userSwitch}`} {`${repoSwitch}`}</Text>
      <SearchBar
        onChangeText={setQuery}
        onSubmitEditing={onSubmitEditing}
        onFilterTapped={() => {
          navigation.navigate(
            'Settings' as never,
            {
                userSwitch,
                setUserSwitch,
                repoSwitch,
                setRepoSwitch,
                  
            } as never
          );
        }}
        value={query}
        placeholder="Search a user or a repository..."
      />
      <View></View>
      <Text style={styles.desc}>
        {' '}
        {combinedList.length} results found in {duration / 1000} seconds. {'('}{' '}
        {users?.items.length} users , {repos?.items.length} repos {')'}{' '}
      </Text>
  
      <FlatList
        data={combinedList}
        renderItem={({item, index}) => {
          return 'type' in item ? (
            <Item
              type={'user'}
              color={``}
              title={item.login}
              uri={item.avatar_url}
              onTap ={()=> {}}
            />
          ) : (
            <Item
              type={'repo'}
              color={stringToColor(item.full_name)}
              title={item.full_name}
              uri={''}
              onTap ={()=> {}}
            />
          );
        }}
        keyExtractor={item => `${item.id}`}
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
  search_row: {
    flexDirection: 'row',
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
  toggle: {
    justifyContent: 'center',
    marginRight: Padding.low,
    marginLeft: 'auto',
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
  image: {
    width: 24,
    height: 24,
    borderRadius: 24,
  },
  desc: {
    fontFamily: Fonts.PoppinsLight,
    fontSize: 12,

    textAlign: 'center',
  },
});
