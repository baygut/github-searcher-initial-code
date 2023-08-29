import React, {useContext, useEffect, useState} from 'react';
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
  ActivityIndicator,
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
import { NetworkAvatar } from '../../components/NetworkAvatar';


type ItemProps = {
  title: string;
  color: string;
  type: string;
  uri: string;
  onTap: () => void;
};

const Item = ({title, color, type, uri, onTap}: ItemProps) => (
  <TouchableOpacity activeOpacity={0.7} onPress={onTap}>
    <View style={styles.item}>
      <View style={styles.icons}>
        {type !== 'user' ? (
          <RepoSwitchIcon color={color} />
        ) : (
          <NetworkAvatar uri={uri} ></NetworkAvatar>
        )}
      </View>
      <Text style={styles.title} ellipsizeMode={'tail'} numberOfLines={1}>
        {title}
      </Text>

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
  const [loading, setLoading] = useState(false);

  const onSubmitEditing = () => {
    setRepos(undefined);
    setUsers(undefined);
    const fetchResults = async () => {
      setLoading(true);
      setTimeout(() => {}, 5000);
      if (query) {
        const start = Date.now();
        const repoResponse = repoSwitch
          ? await RepoService.fetchRepos(query)
          : null;
        const userResponse = userSwitch
          ? await UserService.fetchUsers(query)
          : null;
        const end = Date.now();
        setDuration(end - start);
        if (repoResponse && 'error' in repoResponse) {
          console.error('An error occurred:', repoResponse.error); //TODO!
        } else if (userResponse && 'error' in userResponse) {
          console.error('An error occurred:', userResponse.error); //TODO!
        } else {
          repoResponse && setRepos(repoResponse);
          userResponse && setUsers(userResponse);
        }
      }
      setLoading(false);
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
            } as never,
          );
        }}
        value={query}
        placeholder="Search a user or a repository..."
      />
      <View></View>
      <Text style={styles.desc}>
        {combinedList.length ?? 0} results found in {duration / 1000} seconds.{' '}
        {'('}
        {users?.items.length ?? 0} users , {repos?.items.length ?? 0} repos{' '}
        {')'}
      </Text>
      {loading ? (
        <ActivityIndicator style={styles.indicator} />
      ) : (
        <FlatList
          data={combinedList}
          renderItem={({item, index}) => {
            return 'type' in item ? (
              <Item
                type={'user'}
                color={``}
                title={item.login}
                uri={item.avatar_url}
                onTap={() => {
                  navigation.navigate(
                    'Details' as never,
                    {
                      data: item,
                      type: 'user',
                    } as never,
                  );
                }}
              />
            ) : (
              <Item
                type={'repo'}
                color={stringToColor(item.full_name)}
                title={item.full_name}
                uri={''}
                onTap={() => {
                  navigation.navigate(
                    'Details' as never,
                    {
                      data: item,
                      type: 'repo',
                    } as never,
                  );
                }}
              />
            );
          }}
          keyExtractor={item => `${item.id}`}
        />
      )}
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
  indicator: {
    marginTop: 'auto',
    marginBottom: 'auto',
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
    paddingRight: 'auto',
    width: '70%',
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

  desc: {
    fontFamily: Fonts.PoppinsLight,
    fontSize: 12,

    textAlign: 'center',
  },
});
