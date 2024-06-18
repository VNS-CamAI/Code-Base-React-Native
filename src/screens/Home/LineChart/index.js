import { useCallback, useEffect, useState, useRef } from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from './styles';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { eventAI } from '../../../services/api/eventAI';
import RNPickerSelect from 'react-native-picker-select';
import {
    AutocompleteDropdown,
    AutocompleteDropdownContextProvider,
} from 'react-native-autocomplete-dropdown';
import { getDateInChart } from '../../../utils';

const Item = ({ title, active }) => (
    <View style={styles.item}>
        <Text
            style={active ? { ...styles.title, ...styles.active } : { ...styles.title }}>
            {title}
        </Text>
    </View>
);

const dayFill = [
    {
        value: 7,
        label: '7N',
        step: '1',
    },
    {
        value: 30,
        label: '30N',
        step: '5',
    },
    {
        value: 90,
        label: '90N',
        step: '10',
    },
    {
        value: 180,
        label: '180N',
        step: '30',
    },
];

function LineChartService({ type, codeService, listInfo, navigation }) {
    const provinceController = useRef(null);
    const [stateValue, setStateValue] = useState({
        label: dayFill[0].label,
        value: dayFill[0].value,
        step: dayFill[0].step,
    });
    const [codeCamera, setCodeCamera] = useState(null);
    const [listCamera, setListCamera] = useState();
    const [dataValue, setDataValue] = useState([0]);
    const [listLabel, setListLabel] = useState(['0']);
    const screenWidth = Dimensions.get('window').width;
    const [showChevron, setShowChevron] = useState(true)
    const chartConfig = {
        backgroundGradientFrom: '#fff',
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: '#fff',
        backgroundGradientToOpacity: 0,
        color: () => 'rgba(0, 0, 0, 1)',
        strokeWidth: 2,
        barPercentage: 1,
        useShadowColorFromDataset: true,
        fillShadowGradientFrom: '#141ED2',
        fillShadowGradientFromOpacity: 0.16,
        fillShadowGradientTo: '#141ED2',
        fillShadowGradientToOpacity: 0,
        propsForHorizontalLabels: {
            fontSize: 12,
            fontWeight: 'bold',
        },
        decimalPlaces: dataValue.length === 1 ? 1 : 0
    };
    const data = {
        labels: listLabel,
        datasets: [
            {
                data: dataValue,
                color: () => '#141ED2',
                strokeWidth: 2,
            },
        ],
    };

    const getDataDetectAction = useCallback(async (service, codeCam, duration, totalTime) => {
        try {
            const params = {
                ai_service_code: service,
                camera_code: codeCam,
                total_time: totalTime,
                duration: duration,
            };
            const res = await eventAI.getStatEvent(params);
            let label = [];
            let data = [];
            //console.log(res);
            if (res.length > 0) {
                if (res.length === 1) {
                    res.forEach((item) => {
                        label.push(getDateInChart(item.START_DATE))
                        label.push(getDateInChart(item.END_DATE))
                        data = [0, item.TOTAL_RESULT]
                    })
                } else {
                    res.forEach((item, index) => {
                        if (index === 0) {
                            label.push(getDateInChart(item.START_DATE))
                        } else {
                            label.push(getDateInChart(item.END_DATE))
                        }
                        data.push(item.TOTAL_RESULT)
                    })
                }
                // if(label.length > 5) {
                //     label[6] = ''
                // }
                setListLabel(label);
                setDataValue(data);
            }
            else {
                setListLabel(['0']);
                setDataValue([0]);
            }
        } catch (error) {
            return [];
        }
    }, []);

    const handleGetCameraAct = value => {
        setCodeCamera(value);
    };

    const handleClickChangeValue = (label, value, step) => {
        setStateValue({ label: label, value: value, step: step });
    };

    useEffect(() => {
        if (listInfo) {
            let listService = [...listInfo?.list_service];
            let index = listService.findIndex(
                item => item?.AI_SERVICE_CODE === codeService
            );
            if (index >= 0) {
                let cameras = [...listInfo?.list_camera];
                setListCamera(cameras);
                // setCodeCamera(cameras[0].CAMERA_CODE);
            }
        }
    }, [listInfo, codeService]);;

    useEffect(() => {
        if (listCamera?.length > 0 && codeCamera) {
            getDataDetectAction(codeService, codeCamera, stateValue.step, stateValue.value)
        }
        if (!codeCamera) {
            setListLabel(['0']);
            setDataValue([0]);
        }

    }, [codeCamera, codeService, listCamera, stateValue, getDataDetectAction])
    useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', e => {
            provinceController.current.close()
        });

        return unsubscribe;
    }, [navigation]);
    return (
        <View style={styles.container}>
            <View style={styles.header_fill}>
                <Text style={styles.header}>{type}</Text>
                <View style={styles.fill}>
                    {dayFill.map(item => {
                        return (
                            <Pressable
                                key={item.value}
                                style={styles.day}
                                onPress={e =>
                                    handleClickChangeValue(item.label, item.value, item.step)
                                }>
                                <Item
                                    active={stateValue.label === item.label}
                                    title={item.label}
                                />
                            </Pressable>
                        );
                    })}
                </View>
            </View>
            <AutocompleteDropdown
                controller={controller => {
                    provinceController.current = controller;
                }}
                // suggestionsListMaxHeight={360}
                showChevron={false}
                onFocus={() => {
                    setShowChevron(true)
                }}
                onBlur={() => {
                    setShowChevron(false)
                }}
                clearOnFocus={false}
                closeOnBlur={false}
                closeOnSubmit={false}
                initialValue={{}}
                onSelectItem={data => handleGetCameraAct(data?.id)}
                dataSet={
                    listCamera
                        ? listCamera.map((item, index) => {
                            return {
                                id: item?.CAMERA_CODE,
                                title: item?.NAME_CAM,
                            };
                        })
                        : []
                }
                emptyResultText={'Không có dữ liệu'}
                textInputProps={{
                    placeholder: 'Lựa chọn',
                    autoCorrect: false,
                    autoCapitalize: 'none',
                    style: {
                        color: '#000'
                    }
                }}
                inputContainerStyle={styles.choose_camera}
            />
            <LineChart
                data={data}
                width={screenWidth - 24}
                height={220}
                chartConfig={chartConfig}
                style={{ marginVertical: 8, borderRadius: 16, marginLeft: -20}}
                withDots={true}
                bezier
                fromZero
                segments={dataValue.length + 1}
            />
        </View>
    );
}

export default LineChartService;
