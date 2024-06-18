import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainContainer from './src/navigation/MainContainer';
import Login from './src/screens/Login/Login';
import Home from './src/screens/Home/Home';
import Wellcome from './src/screens/Login/Wellcome';
import Forgot from './src/screens/Forgot/Forgot';
import Register from './src/screens/Register/Register';
import ChangePassword from './src/screens/ChangePassWord/ChangePassword';
import Payment from './src/screens/Payment/Payment';
import CodeVerify from './src/components/CodeVerify/CodeVerify';
import Success from './src/components/CodeVerify/Success';
import Live from './src/screens/Stream/Live/Live';
import Detail from './src/screens/Info/Detail/Detail';
import Setting from './src/screens/Stream/Setting/Setting';
import { Store } from './src/redux/store';
import { Provider } from 'react-redux';
import PlayBack from './src/screens/Playback/Playback';
import Notification from './src/screens/Notification';
import SettingNotification from './src/screens/Info/SettingNotification/SettingNotification';

import EditInfo from './src/screens/Info/EditInfo/Edit';
import ChangePasswordInfo from './src/screens/Info/ChangePasswordInfo/ChangePasswordInfo';
import Dashboard from './src/screens/Dashboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginFirst from './src/screens/LoginFirst/LoginFirst';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import axios from 'axios';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Info from './src/screens/Info/Info';
import {API_URL} from "react-native-dotenv";
// import MapScreen from './src/screens/Map/MapScreen';
// import requestUserPermission from './src/utils/FCM_helper';
// import { NotificationListener } from './src/utils/FCM_helper';
const Stack = createStackNavigator();
export default function App() {
  // useEffect(() => {
  //   SplashScreen.hide();
  // }, []);
  const [data, setData] = useState();
  useEffect(() => {
    let login = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setData(token);
      }
    };

    login();
  }, []);
  useEffect(() => {
    async function refreshToken() {
      try {
          console.log("zo");
          let refresh = await AsyncStorage.getItem('refresh');
          const res = await axios.post(
              `${API_URL}authenticator/refreshToken/`,
              {
                  refresh: refresh,
              },
              {
                  headers: {
                      'Content-Type': 'application/json',
                  },
              },
          );
          await AsyncStorage.setItem('token', res.data.access);
          // window.location.reload()
      } catch (error) {
        console.log( 'refreshToken', error);
        return error.response.status;
      }
    }
    const refresh = setInterval(() => {
      refreshToken();
    }, 2 * 60 * 60000)
    return () => {
      clearInterval(refresh)
    }
  }, [])
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AutocompleteDropdownContextProvider>
        <Provider store={Store}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName={'Wellcom'}
              screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="LoginFirst" component={LoginFirst} />
              <Stack.Screen name="Wellcom" component={Wellcome} />
              <Stack.Screen name="Home" component={MainContainer} />
              <Stack.Screen name="Forgot" component={Forgot} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="ChangePassword" component={ChangePassword} />
              <Stack.Screen name="CodeVerify" component={CodeVerify} />
              <Stack.Screen name="Success" component={Success} />
              <Stack.Screen name="Live" component={Live} />
              <Stack.Screen name="Setting" component={Setting} />
              <Stack.Screen name="Detail" component={Detail} />
              <Stack.Screen name="PlayBack" component={PlayBack} />
              <Stack.Screen name="Notification" component={Notification} />
              <Stack.Screen
                name="SettingNotification"
                component={SettingNotification}
              />
              <Stack.Screen
                name="ChangePasswordInfo"
                component={ChangePasswordInfo}
              />
              <Stack.Screen name="EditInfo" component={EditInfo} />
              <Stack.Screen name="Report" component={Payment} />
              <Stack.Screen name="Dashboard" component={Dashboard} />
              <Stack.Screen name="Info" component={Info} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </AutocompleteDropdownContextProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  auto: {},
});
