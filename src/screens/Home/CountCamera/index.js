import { View, Text, ImageBackground, Pressable } from 'react-native';
import { styles } from './styles';
import ImageCamOn from '../../../assets/images/online.png';
import ImageCam from '../../../assets/images/cam.png';
import DisConnect from '../../../assets/images/DisConnect.png';
import { useDispatch } from 'react-redux';
import { setStatus } from '../../../redux/actions/cameraAction';

function CountCamera({ countCamera, companyName, navigation }) {
  const dispatch = useDispatch();
  //console.log(countCamera, 'countCamera');
  const handlePressLive = status => {
    dispatch(setStatus(status));
    navigation.navigate('Stream');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thống kê camera {companyName}</Text>
      {/* content */}
      <View style={styles.contentHeader}>
        <View style={styles.boxHeader}>
          <Pressable
            style={styles.headerItem}
            onPress={() => handlePressLive('On')}>
            <ImageBackground style={styles.image_camera} source={ImageCam} />
            <Text style={styles.number}>{countCamera?.COUNT_CAM ? countCamera?.COUNT_CAM : 0}</Text>
            <Text style={styles.name}>Tổng Camera</Text>
          </Pressable>
          <Pressable
            style={styles.headerItem}
            onPress={() => handlePressLive('On')}>
            <ImageBackground style={styles.image_camera} source={ImageCamOn} />
            <Text style={styles.number}>{countCamera?.ACTIVE ? countCamera.ACTIVE : 0}</Text>
            <Text style={styles.name}>Đang trực tuyến</Text>
          </Pressable>

          <Pressable
            style={styles.headerItem}
            onPress={() => handlePressLive('Off')}>
            <ImageBackground style={styles.image_camera} source={DisConnect} />
            <Text style={styles.number}>
              {Number(countCamera?.NO_CONNECT ? countCamera?.NO_CONNECT : 0) +
                Number(countCamera?.WEAK ? countCamera?.WEAK : 0)}
            </Text>
            <Text style={styles.name}>Mất kết nối</Text>
          </Pressable>
          <Pressable
            style={styles.headerItem}
            onPress={() => handlePressLive('Off')}>
            <ImageBackground style={styles.image_camera} source={DisConnect} />
            <Text style={styles.number}>
              {Number(countCamera?.INACTIVE ? countCamera?.INACTIVE : 0)}
            </Text>
            <Text style={styles.name}>Sẵn sàng</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default CountCamera;
