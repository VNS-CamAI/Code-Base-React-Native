import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableHighlight,
  TextInput,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {
  LockIcon,
  UserIcon,
  EyeIcon,
  UnEyeIcon,
  SuccessIcon,
  ErrorIcon,
} from '../../components/Icons/Index';
// import { StackActions, NavigationActions } from 'react-navigation';
import { StackActions } from '@react-navigation/native';

// import messaging from '@react-native-firebase/messaging';
import { styles } from './styles';
import Orientation from 'react-native-orientation-locker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosClient from '../../services/axiosClient';
import { useDispatch } from 'react-redux';
import { setUserTypeCode } from '../../redux/actions/getUserAction';
import { isValidateCompanyCode, isValidatePassword, isValidatorUsername, version } from '../../utils';
import CompanyIcon from '../../components/Icons/Login/Company';
import {API_URL, BASE_URL} from "react-native-dotenv";

const Login = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [companyTax, setCompanyTax] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPass, setIsShowPass] = useState(true);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [error2, setError2] = useState(false);
  const [message, setMessage] = useState();
  const [modalSuccess, setModalSuccess] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const handleLogin = async () => {
    if(!isLoading){
      if (
        isValidatorUsername(userName) &&
        isValidatePassword(password) &&
        companyTax.trim().length > 0
      ) {
        try {
          setIsLoading(true)
          const res = await axios.post(
            `${API_URL}authenticator/login/`,
            {
              tax_code: companyTax,
              username: userName,
              password: password,
            },
          );
          if (res) {
            await AsyncStorage.setItem('token', res.data.access);
            await AsyncStorage.setItem('refresh', res.data.refresh);
            await AsyncStorage.setItem('userName', userName);
            await AsyncStorage.setItem('companyCode', companyTax);
          await AsyncStorage.setItem('password', password);
            
            const infoUser = await axiosClient.get('/user/get-user-info/');
            await AsyncStorage.setItem('name', infoUser[0]?.NAME);
            await AsyncStorage.setItem('avatar',`${BASE_URL}${infoUser[0]?.AVATAR}`)
            let userTypeCode = infoUser[0]?.USERTYPE_CODE;
            dispatch(setUserTypeCode(userTypeCode));
            setError2(false);
            setModalSuccess(true);
            const resetAction = StackActions.replace('Home');
            navigation.dispatch(resetAction);
            
          }
          setIsLoading(false)
        } catch (e) {
          setError2(true);
          setModalSuccess(true);
          setMessage(e.response.data.detail);
          setIsLoading(false)
        }
      } else {
        setModalSuccess(true);
        setError(true);
        setError2(true);
      }
    }
    else{

    }
  };
  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);
  
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.container}>
        <View style={styles.contentLogin}>
          <View style={styles.contentForm}>
            <Image
              style={styles.imageBg}
              source={require('../../assets/images/Background_login.png')}
            />
            <View style={styles.formLogin}>
              <>
                <Image
                  style={styles.logo}
                  source={require('../../assets/images/Logo_app.png')}
                />
                <Text style={styles.text_header}>Hệ thống VNS CamAI</Text>
              </>
              <View>
                <View style={styles.formInput}>
                  <View style={styles.userIcon}>
                    <CompanyIcon />
                  </View>
                  <TextInput
                    autoCapitalize = {"characters"}
                    placeholderTextColor={'rgba(0, 0, 0, 0.4)'}
                    onChangeText={text => {
                      setCompanyTax(text);
                      setError(false);
                    }}
                    style={
                      (!isValidateCompanyCode(companyTax) && companyTax !== '') ||
                        (error && companyTax.length === 0)
                        ? { ...styles.input, ...styles.borderError }
                        : styles.input
                    }
                    value={companyTax}
                    placeholder="Mã công ty"
                  />
                </View>
                <View style={styles.formInput}>
                  <View style={styles.userIcon}>
                    <UserIcon />
                  </View>
                  <TextInput
                    autoCapitalize = {"none"}
                    placeholderTextColor={'rgba(0, 0, 0, 0.4)'}
                    onChangeText={text => {
                      setUserName(text);
                      setError(false);
                    }}
                    style={
                      (userName.length < 6 && userName !== '') ||
                        (error && userName.length === 0)
                        ? { ...styles.input, ...styles.borderError }
                        : styles.input
                    }
                    value={userName}
                    placeholder="Tên đăng nhập"
                  />
                </View>
                <View style={styles.formInput}>
                  <View style={styles.lockIcon}>
                    <LockIcon />
                  </View>
                  <Pressable
                    onPress={() => setIsShowPass(!isShowPass)}
                    style={styles.eyeIcon}>
                    {isShowPass ? <EyeIcon /> : <UnEyeIcon />}
                  </Pressable>
                  <TextInput
                    placeholderTextColor={'rgba(0, 0, 0, 0.4)'}
                    style={
                      (!isValidatePassword(password) && password != '') ||
                        (error && password.length === 0)
                        ? { ...styles.input, ...styles.borderError }
                        : styles.input
                    }
                    placeholder="Mật khẩu"
                    secureTextEntry={isShowPass}
                    value={password}
                    onChangeText={text => {
                      setError(false);
                      setPassword(text);
                    }}
                  />
                </View>
                <TouchableHighlight onPress={handleLogin} style={styles.login}>
                  <View style={styles.buttonLogin}>
                    <Text style={styles.btnText}>Đăng nhập</Text>
                  </View>
                </TouchableHighlight>
                <Text
                  onPress={() => navigation.navigate('Forgot')}
                  style={styles.forgot}>
                  Quên mật khẩu
                </Text>
              </View>
              <View style={styles.end}>
                <Text
                  style={styles.coppyright}>
                  Bản quyền thuộc về Công ty cổ phần công nghệ Vinorsoft
                </Text>
                <Text
                  style={styles.coppyright}
                >
                  {`Phiên bản v${version}`}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {(error || error2) && (
          <Modal
            animationType={'fade'}
            transparent={true}
            visible={modalSuccess}
            style={styles.modal}>
            <View style={styles.mainView}>
              <View style={styles.headerModal}>
                <View style={{ ...styles.textHeader, ...styles.iconHeader }}>
                  {error2 ? <ErrorIcon /> : <SuccessIcon />}
                </View>
                <Text style={styles.textHeader}>
                  {error2
                    ? 'Đăng nhập không thành công'
                    : 'Đăng nhập thành công'}
                </Text>
                {error2 && (
                  <>
                    {/* <Text style={styles.textHeader}>
                      {error && !isValidatePassword(password) ? (
                        <>
                          {message}
                        </>
                      ) : !isValidatorUsername(userName) ? (
                        <>
                          {message}
                        </>
                      ) : (
                        <>
                          <Text>{message}</Text>
                        </>
                      )}
                    </Text> */}
                    <View style={styles.footer}>
                      <TouchableOpacity
                        onPress={() => setModalSuccess(!modalSuccess)}
                        style={styles.login_item}>
                        <View style={styles.button_footer_item}>
                          <Text style={styles.btnText}>Huỷ bỏ</Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => setModalSuccess(!modalSuccess)}
                        style={styles.login_item}>
                        <View style={styles.button_footer_item}>
                          <Text style={{ ...styles.btnText, ...styles.primary }}>
                            Đồng ý
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            </View>
          </Modal>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
export default Login;
