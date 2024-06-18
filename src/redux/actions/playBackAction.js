export const GET_LIST_PLAYBACK = 'GET_LIST_PLAYBACK';
export const SET_DAY = 'SET_DAY';
export const SET_TIME = 'SET_TIME';
export const SET_TIME_END = 'SET_TIME_END';
export const SET_FULL_SCREEN = 'SET_FULL_SCREEN';
export const SET_TIME_STICK = 'SET_TIME_STICK';
export const SET_LIST_CAMERA_PLAYBACK = 'SET_LIST_CAMERA_PLAYBACK';
export const SET_RELOAD = 'SET_RELOAD';
export const SET_PROVINCE_CODE_PLAYBACK = 'SET_PROVINCE_CODE_PLAYBACK';
export const SET_DISTRICT_CODE_PLAYBACK = 'SET_DISTRICT_CODE_PLAYBACK';
export const SET_IS_BG = 'SET_IS_BG';
export const GET_LIST_PROVINCE = 'GET_LIST_PROVINCE';
export const GET_LIST_DISTRICT = 'GET_LIST_DISTRICT';

export const getListPlayBack = data => {
  return {
    type: GET_LIST_PLAYBACK,
    payload: data,
  };
};
export const setDay = data => {
  return {
    type: SET_DAY,
    payload: data,
  };
};
export const setReload = data => {
  return {
    type: SET_RELOAD,
    payload: data,
  };
};
export const setTime = data => {
  return {
    type: SET_TIME,
    payload: data,
  };
};
export const setTimeEnd = data => {
  return {
    type: SET_TIME_END,
    payload: data,
  };
};
export const setIsFullScreen = data => {
  return {
    type: SET_FULL_SCREEN,
    payload: data,
  };
};
export const setTimeStick = data => {
  return {
    type: SET_TIME_STICK,
    payload: data,
  };
};
export const setListCameraPlayBack = data => {
  return {
    type: SET_LIST_CAMERA_PLAYBACK,
    payload: data,
  };
};
export const setProvinceCodePlayBack = data => {
  return {
    type: SET_PROVINCE_CODE_PLAYBACK,
    payload: data,
  };
};
export const setDistrictCodePlayBack = data => {
  return {
    type: SET_DISTRICT_CODE_PLAYBACK,
    payload: data,
  };
};
export const setIsBG = data => {
  return {
    type: SET_IS_BG,
    payload: data,
  };
};
export const setListProvincePb = data => {
  return {
    type: GET_LIST_PROVINCE,
    payload: data,
  };
};
export const setListDistrictPb = data => {
  return {
    type: GET_LIST_DISTRICT,
    payload: data,
  };
};
