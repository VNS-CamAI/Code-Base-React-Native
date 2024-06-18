import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Home';

import {
  ChartIcon,
  YoutubeIcon,
  MapIcon,
  PaymentIcon,
  CameraActiveIcon,
  CameraIcon,
  MapIconActive,
  SmartIcon,
  ChartIconActive,
  YoutubeIconActive,
  UserIcon,
} from '../components/Icons/Index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomeIcon, HomeIconActive } from '../components/Icons/BottomBar/HomeIcon';
// import Dashboard from '../screens/Dashboard';
import UserIconUnActive from '../components/Icons/BottomBar/UserIconUnActive';
const Tab = createBottomTabNavigator();
const MainContainer = ({ route, navigation }) => {
  // //console.log(route.name);
  // useEffect(() => {
  //   navigation.addListener('beforeRemove', e => {
  //     // Prevent default behavior of leaving the screen
  //     e.preventDefault();

  //     // Alert.alert('Đăng xuất?', 'Bạn có muốn đang xuất không', [
  //     //   { text: 'Không', style: 'cancel', onPress: () => { } },
  //     //   {
  //     //     text: 'Có',
  //     //     style: 'destructive',
  //     //     // If the user confirmed, then we dispatch the action we blocked earlier
  //     //     // This will continue the action that had triggered the removal of the screen
  //     //     onPress: () => navigation.dispatch(e.data.action),
  //     //   },
  //     // ]);
  //     // Prompt the user before leaving the screen
  //   });
  // }, [navigation]);
  return (
    <Tab.Navigator
      initialRouteName={'Dashboard'}
      screenOptions={{
        tabBarActiveBackgroundColor: '#FFFFFF',
        tabBarActiveTintColor: 'red',
        tabBarActiveBackgroundColor: 'rgba(20, 30, 210, 0.05)',
        tabBarItemStyle: {
          borderColor: 'rgba(0, 0, 0, 0.05)',
          // borderTopWidth: 1,
        },
        headerShown: false,
      }}>
      <Tab.Screen
        name="Dashboard"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? <HomeIconActive /> : <HomeIcon />,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Stream"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? <CameraActiveIcon /> : <CameraIcon />,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Playback"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? <YoutubeIconActive /> : <YoutubeIcon />,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Smart"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? <SmartIcon /> : <PaymentIcon />,
          tabBarShowLabel: false,
        }}
      />

      <Tab.Screen
        name="Trang chu"
        options={({ navigator }) => ({
          tabBarIcon: ({ color, focused }) =>
            focused ? <ChartIconActive /> : <ChartIcon />,
          tabBarShowLabel: false,
        })}
        component={Home}
      />

      {/* <Tab.Screen
        name="Info"
        component={Info}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? <UserIcon /> : <UserIconUnActive />,
          tabBarShowLabel: false,
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default MainContainer;
