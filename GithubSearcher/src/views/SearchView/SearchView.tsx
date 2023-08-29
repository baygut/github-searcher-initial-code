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
import RepoSwitchIcon from '../../../assets/icons/RepoSwitchIcon';
import UserService from '../../services/user-service/UserService';

import Header from '../../components/Header';
import {SearchBar} from '../../components/SearchBar';
import Colors from '../../utils/colors';

import generateRandomColors from '../../functions/randomColorGenerator';
import Padding from '../../utils/padding';
import Fonts from '../../utils/fonts';


import { User, UserResponse } from '../../services/user-service/UserModel';
import { Repo, RepoResponse } from '../../services/repo-service/RepoModel';
import RepoService from '../../services/repo-service/RepoService';

import Toggle from 'react-native-toggle-element';


type ItemProps = {title: string; color: string; type: string, uri : string};

const Item = ({title, color, type, uri}: ItemProps) => (
  <View style={styles.item}>
    <View style={styles.icons}>
      {type !== 'user' ? (
        <RepoSwitchIcon color={color} />
      ) : (
        <Image source={{uri:uri}} style={styles.image} resizeMode={'contain'} ></Image>
        
      )}
      
    </View>
    <Text style={styles.title}>{title}</Text>
        
    <View style={styles.type}>
      <Text style={styles.type_title}> {type.toUpperCase()} </Text>
    </View>
  </View>
);

//repo presents true, users presents true

export function SearchView(): JSX.Element {
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState<UserResponse>();
    const [repos, setRepos] = useState<RepoResponse>();
    const colors : string[] = generateRandomColors(repos?.items.length ?? 1);
    const [toggleValue, setToggleValue] = useState(false);

    const onSubmitEditing = () => {
        const fetchResults = async ()=> {
        if(query) {
            const repoResponse = await RepoService.fetchRepos(query);
            const userResponse = await UserService.fetchUsers(query);
            if ('error' in repoResponse) {
                console.error('An error occurred:', repoResponse.error); //TODO!
            } else if ('error' in userResponse){
                console.error('An error occurred:', userResponse.error); //TODO!
            }
            else {
                setRepos(repoResponse);
                setUsers(userResponse);
            }
            }
        }
        fetchResults();
    }
    
    type ListItem = User | Repo; // Common interface for

    const combinedList: ListItem[] = [...users?.items ?? [], ...repos?.items ?? []];

  return (
    <SafeAreaView style={styles.safe}>
      <Header />
      <View style={styles.search_row} >
      <View style ={styles.search}>
      <SearchBar
        onChangeText={setQuery}
        onSubmitEditing = {onSubmitEditing}
        value={query}
        placeholder="Search a user or a repository..."
      />
      </View>
      <View style={styles.toggle} >
      <Toggle
        value={toggleValue}
        onPress={newState => setToggleValue(!toggleValue)}
        thumbActiveComponent={<RepoSwitchIcon size={15}/>}
        thumbInActiveComponent={
          <UserIcon size={15} />
        }
        trackBar={{
          activeBackgroundColor: '#9ee3fb',
          inActiveBackgroundColor: '#3c4145',
          borderActiveColor: '#86c3d7',
          borderInActiveColor: '#1c1c1c',
          borderWidth: 5,
          width: 50,
          height: 20,


        }}
        thumbButton={{
            width: 35,
            height : 35,
            activeBackgroundColor : Colors.Secondary,
            inActiveBackgroundColor : Colors.Secondary,
            borderWidth :10,

        }}
      />
      </View>
      </View>
      <View></View>
      <FlatList
        data={combinedList}
        renderItem={({item, index}) => {
            return (
                ('type' in item) ? <Item
                type={"user"}
                color={`${colors.at(index)}`}
                title={item.login}
                uri={item.avatar_url}
              /> : <Item
              type={"repo"}
              color={`${colors.at(index)}`}
              title={item.full_name}
              uri={""}
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
    flexDirection : 'row'
  },
  search :{
    width : '85%',
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
  toggle : {
    justifyContent : 'center',
    marginRight : Padding.low,
    marginLeft : 'auto',
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
  image : {
    width : 24,
    height : 24,
    borderRadius : 24
  }
});


