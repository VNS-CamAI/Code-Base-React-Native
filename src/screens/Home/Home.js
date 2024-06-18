import { View, ScrollView, Alert, SafeAreaView } from 'react-native';
import Header from '../../components/Header/Header';
import { style } from './styles';
import CountCamera from './CountCamera';
import DonutChart from './DonutChart';
import { useEffect, useState } from 'react';
import Orientation from 'react-native-orientation-locker';
import CountAI from './CountAI';
import axiosClient from '../../services/axiosClient';
import AnalyticAI from './AnalyticAI';

export default function Home({ navigation }) {
  const [countCamera, setCountCamera] = useState({
    COUNT_CAM: 0,
    ACTIVE: 0,
    INACTIVE: 0,
    VIEWS: 0,
    COMPANY_CODE: 'DEFAULT',
    MOTION: 0,
    COMMON_OBJECT: 0,
    MOVEMENT: 0,
    NO_CONNECT: 0,
    WEAK: 0,
  });
  const [companyName, setCompanyName] = useState('');
  const [statusGet, setStatusGet] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const getCountCam = async () => {
    try {
      const getCountCamera = await axiosClient.post(
        '/statCountCam/post-add-stat-count-cam/',
      );
      setCountCamera({
        COUNT_CAM: getCountCamera.data[0]?.COUNT_CAM,
        ACTIVE: getCountCamera.data[0]?.ACTIVE,
        INACTIVE: getCountCamera.data[0]?.INACTIVE,
        NO_CONNECT: getCountCamera.data[0]?.LOST_CONNECT,
        WEAK: getCountCamera.data[0]?.CONNECT_WEAK,
        VIEWS: getCountCamera.data[0]?.VIEWS,
        COMPANY_CODE: getCountCamera.data[0]?.COMPANY_CODE,
        MOTION: getCountCamera.data[0]?.MOTION,
        COMMON_OBJECT: getCountCamera.data[0]?.COMMON_OBJECT,
        MOVEMENT: getCountCamera.data[0]?.MOVEMENT,
      });
      setStatusGet(getCountCamera.result);
      return getCountCamera;
    } catch (error) {
      //console.log(error);
      setStatusGet(true);
    }
  };

  const getCompany = async code => {
    try {
      const getNameCompany = await axiosClient.get(
        `/company/get-list-company/?company_code=${code}`,
      );
      let name = getNameCompany[0]?.NAME ? getNameCompany[0]?.NAME : 'Mặc định';
      setCompanyName(name);
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    const getAndUpDateCountCamera = async () => {
      const countCam = await getCountCam();
      let code = countCam[0]?.COMPANY_CODE;
      if (code) {
        await getCompany();
      }
    };
    getAndUpDateCountCamera();
  }, []);

  useEffect(() => {
    const getUpdateCount = async () => {
      try {
        const upDateCountCamera = await axiosClient.get(
          '/statCountCam/get-list-stat-count-cam/',
        );
        setCountCamera({
          COUNT_CAM: upDateCountCamera[0]?.COUNT_CAM,
          ACTIVE: upDateCountCamera[0]?.ACTIVE,
          INACTIVE: upDateCountCamera[0]?.INACTIVE,
          NO_CONNECT: upDateCountCamera[0]?.LOST_CONNECT,
          WEAK: upDateCountCamera[0]?.CONNECT_WEAK,
          VIEWS: upDateCountCamera[0]?.VIEWS,
          COMPANY_CODE: upDateCountCamera[0]?.COMPANY_CODE,
          MOTION: upDateCountCamera[0]?.MOTION,
          COMMON_OBJECT: upDateCountCamera[0]?.COMMON_OBJECT,
          MOVEMENT: upDateCountCamera[0]?.MOVEMENT,
        });
        if (companyName.trim().length <= 0) {
          let code = upDateCountCamera[0]?.COMPANY_CODE;
          await getCompany(code);
        }
        return upDateCountCamera;
      } catch (error) {
        //console.log(error);
      }
    };
    getUpdateCount();
  }, []);

  useEffect(() => {
    Orientation.lockToPortrait(); //this will lock the view to Portrait
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {
      setRefresh(!refresh);
    });

    return unsubscribe;
  }, [navigation, refresh]);

  return (
    <>
      <Header title={'Thống kê'} navigation={navigation} />
      <SafeAreaView>
        <View style={style.container}>
          <ScrollView>
            <CountCamera companyName={companyName} countCamera={countCamera} navigation={navigation}/>
            <CountAI countCamera={countCamera} companyName={companyName} navigation={navigation}/>
            <DonutChart title={'Tổng số Camera theo nhóm'} type={'group'} />
            <DonutChart
              title={'Tổng số Camera theo kho'}
              type={'warehouse'}
              refresh={refresh}
            />
            <AnalyticAI navigation={navigation} />
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}
