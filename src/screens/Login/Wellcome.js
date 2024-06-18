import React from 'react';
import {
  View,
  ImageBackground,
  Text,
  TouchableHighlight,
  Image,
} from 'react-native';
import { styles } from './styles';
import { StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoApp from '../../assets/images/Logo_app.png';
const Wellcome = ({ navigation }) => {
  React.useEffect(() => {
    let login = async () => {
      const token = await AsyncStorage.getItem('token');
      const userName = await AsyncStorage.getItem('userName');
      const taxCode = await AsyncStorage.getItem('companyCode');
      if (token && userName && taxCode) {
        const resetAction = StackActions.replace('LoginFirst');
        navigation.dispatch(resetAction);
      } else {
        const resetAction = StackActions.replace('Login');
        navigation.dispatch(resetAction);
      }
    };
    setTimeout(() => {
      login();
    }, 2000);
  }, []);

  return (
    <View
      style={styles.container}
    // source={require('../../assets/images/BgLogin.png')}
    >
      <View style={styles.content}>
        <Image source={LogoApp} />
        <Text style={styles.text}>Hệ thống VNS CamAI</Text>
      </View>
    </View>
  );
};

export default Wellcome;
