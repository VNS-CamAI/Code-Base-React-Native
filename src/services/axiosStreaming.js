import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, API_STREAM_URL } from "react-native-dotenv";
const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return token;
    } catch (e) {
        //console.log(e);
    }
};
const streamingClient = axios.create({
    baseURL: `${API_STREAM_URL}`,
    headers: {
        'content-type': 'application/json',
        // 'authorization': `vinorsoft ${sessionStorage.getItem('token')}`
    },
});
streamingClient.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('token');
        ////console.log(token)
        if (token) {
            config.headers.Authorization = 'vinorsoft ' + token;
            ////console.log(config.headers.Authorization)
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

streamingClient.interceptors.response.use(
    response => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    error => {
        if (getToken() && error.response.status === 401) {
            async function refreshToken() {
                try {
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
                    return error.response.status;
                }
            }
            refreshToken();
        }
        throw error;
    },
);
export default streamingClient;
