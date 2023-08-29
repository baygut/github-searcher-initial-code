/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SearchView} from './src/views/SearchView/SearchView';
import {SettingsView} from './src/views/SettingsView/SettingsView';
import {DetailsView} from './src/views/DetailsView/DetailsView';
import {  createContext } from "react";
import { UserResponse } from './src/services/user-service/UserModel';
import { RepoResponse } from './src/services/repo-service/RepoModel';

export type RootStackParamList = {
  Search: undefined;
  Settings: {
    userSwitch: any;
    setUserSwitch : any;
    repoSwitch: any;
    setRepoSwitch : any;
  };
  Details: {data : UserResponse | RepoResponse} | undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();


function App(): JSX.Element {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Search">
        <RootStack.Screen
          name="Search"
          options={{headerShown: false}}
          component={SearchView}
        />
        <RootStack.Screen name="Settings" children={SettingsView} />
        <RootStack.Screen name="Details" component={DetailsView} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
