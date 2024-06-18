export const GET_LIST_REPORT = 'GET_LIST_REPORT';
export const SET_DAY_REPORT = 'SET_DAY_REPORT';
export const SET_TIME_REPORT = 'SET_TIME_REPORT';
export const SET_TIME_START = 'SET_TIME_START';
export const SET_TIME_END = 'SET_TIME_END';
export const SET_FULL_SCREEN = 'SET_FULL_SCREEN';
export const VIDEO_ACTIVE = 'VIDEO_ACTIVE';
export const GET_LIST_SERVICE_PACKAGE = 'GET_LIST_SERVICE_PACKAGE';
export const SET_AI_CODE = 'SET_AI_CODE';
export const SET_AI_NAME = 'SET_AI_NAME';
export const SET_LIST_CAMERA = 'SET_LIST_CAMERA';
export const SET_LIST_CAMERA2 = 'SET_LIST_CAMERA2';
export const SET_PROVINCE_CODE_REPORT = 'SET_PROVINCE_CODE_REPORT';
export const SET_DISTRICT_CODE_REPORT = 'SET_DISTRICT_CODE_REPORT';
export const SET_CHECK_BG_REPORT = 'SET_CHECK_BG_REPORT';
export const SET_SERVICE_CODE = 'SET_SERVICE_CODE';
export const GET_LIST_PROVINCE = 'GET_LIST_PROVINCE';
export const GET_LIST_DISTRICT = 'GET_LIST_DISTRICT';

export const getListReport = data => {
  return {
    type: GET_LIST_REPORT,
    payload: data,
  };
};
export const setDayReport = data => {
  return {
    type: SET_DAY_REPORT,
    payload: data,
  };
};
export const setTimeReport = data => {
  return {
    type: SET_TIME_REPORT,
    payload: data,
  };
};
export const setNameAI = data => {
  return {
    type: SET_AI_NAME,
    payload: data,
  };
};
export const setTimeEnd = data => {
  return {
    type: SET_TIME_END,
    payload: data,
  };
};
export const setTimeStart = data => {
  return {
    type: SET_TIME_START,
    payload: data,
  };
};
export const setIsFullScreen = data => {
  return {
    type: SET_FULL_SCREEN,
    payload: data,
  };
};
export const videoActive = data => {
  return {
    type: VIDEO_ACTIVE,
    payload: data,
  };
};
export const servicePackage = data => {
  return {
    type: GET_LIST_SERVICE_PACKAGE,
    payload: data,
  };
};
export const setAiCode = data => {
  return {
    type: SET_AI_CODE,
    payload: data,
  };
};
export const setListCamera = data => {
  return {
    type: SET_LIST_CAMERA,
    payload: data,
  };
};
export const setListCamera2 = data => {
  // //console.log(data);
  return {
    type: SET_LIST_CAMERA2,
    payload: data,
  };
};
export const setDistrictCodeReport = data => {
  // //console.log(data);
  return {
    type: SET_DISTRICT_CODE_REPORT,
    payload: data,
  };
};
export const setProvinceCodeReport = data => {
  // //console.log(data);
  return {
    type: SET_PROVINCE_CODE_REPORT,
    payload: data,
  };
};
export const setCheckBGReport = data => {
  return {
    type: SET_CHECK_BG_REPORT,
    payload: data,
  };
};
export const setServiceCode = data => {
  return {
    type: SET_SERVICE_CODE,
    payload: data,
  };
};
export const setListProvinceRp = data => {
  return {
    type: GET_LIST_PROVINCE,
    payload: data,
  };
};
export const setListDistricteRp = data => {
  return {
    type: GET_LIST_DISTRICT,
    payload: data,
  };
};
