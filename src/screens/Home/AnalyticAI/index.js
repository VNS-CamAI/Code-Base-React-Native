import { Fragment, useCallback, useEffect, useState } from 'react';
import { services } from '../../../services/api/services';
import { Alert } from 'react-native';
import LineChartService from '../LineChart';
import { eventAI } from '../../../services/api/eventAI';

function AnalyticAI({ navigation }) {
    const [listService, setListService] = useState([]);
    const [listInfo, setListInfo] = useState();
    const getListService = useCallback(async () => {
        try {
            const res = await services.getListServices();
            setListService(res);
        } catch (error) {
            if (error?.response?.status === 401) {
                Alert.alert('Phiên đăng nhập đã hết hạn vui lòng đăng nhâp lại!');
                navigation.navigate('Login');
            } else if (error?.response?.status === 403) {
                Alert.alert('Bạn không có quyền xem thống kê dịch vụ AI');
            } else {
                Alert.alert('Tải giữ liệu thống kê AI không thành công');
            }
        }
    }, []);

    const getListInfo = useCallback(async () => {
        try {
            const res = await eventAI.getInfoStatEvent();
            setListInfo(res);
        } catch (error) {
            //console.log(error);
        }
    }, []);

    useEffect(() => {
        const getData = async () => {
            await getListService();
            await getListInfo();
        };
        getData();
    }, [getListService, getListInfo]);
    // item => item.CODE === '20230222000000000001' || item.CODE === '20230222000000000005' || item.CODE === '20230222000000000004')//
    return (
        <>
            {listService &&
                listService.length > 0 &&
                listService?.map(service => {
                    if (service.CODE === '20230222000000000001' || service.CODE === '20230222000000000004' || service.CODE === '20230222000000000005') {
                        return (
                            <LineChartService
                                key={service?.CODE}
                                type={service?.SUBJECT_NAME}
                                codeService={service?.CODE}
                                listInfo={listInfo}
                                navigation={navigation}
                            />
                        );
                    } else {
                        return <Fragment />;
                    }
                })}
        </>
    );
}

export default AnalyticAI;
