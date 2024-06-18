import { View, Text, ImageBackground,Pressable } from 'react-native';
import { styles } from './styles';
import Move from '../../../assets/images/Movement.png';
import Motion from '../../../assets/images/Motion.png';
import Object1 from '../../../assets/images/Object.png';
import { useDispatch, useSelector } from 'react-redux';
import { setServiceCode } from '../../../redux/actions/reportAction';
import { setRefresh } from '../../../redux/actions/cameraAction';

function CountAI({ countCamera, companyName, navigation }) {
  const dispatch = useDispatch();
  const camera = useSelector(state => state.useReducer);
  const handlePressAI = (value) => {
    navigation.navigate('Smart')
    dispatch(setServiceCode(value))
    dispatch(setRefresh(!camera.refresh))
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Thống kê AI {companyName}
      </Text>
      <View style={styles.boxHeader}>
        <Pressable style={styles.headerItem} onPress={() => handlePressAI('20230222000000000001')}>
          <ImageBackground style={styles.image_camera} source={Motion} />
          <Text style={styles.number}>{countCamera?.MOTION ? countCamera?.MOTION : 0}</Text>
          <Text style={styles.name}>Phát hiện chuyển động</Text>
        </Pressable>
        <Pressable style={styles.headerItem} onPress={() => handlePressAI('20230222000000000004')}>
          <ImageBackground style={styles.image_camera} source={Object1} />
          <Text style={styles.number}>{countCamera?.COMMON_OBJECT ? countCamera?.COMMON_OBJECT : 0}</Text>
          <Text style={styles.name}>Đối tượng phổ biến</Text>
        </Pressable>
      </View>
      <View style={styles.boxHeader}>
        <Pressable style={styles.headerItem} onPress={() => handlePressAI('20230222000000000005')}>
          <ImageBackground style={styles.image_camera} source={Move} />
          <Text style={styles.number}>{countCamera?.MOVEMENT ? countCamera?.MOVEMENT : 0}</Text>
          <Text style={styles.name}>Camera dịch chuyển</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default CountAI;
