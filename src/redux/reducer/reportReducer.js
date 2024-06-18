import {
  GET_LIST_REPORT,
  SET_DAY_REPORT,
  SET_TIME_REPORT,
  SET_FULL_SCREEN,
  SET_TIME_END,
  SET_TIME_START,
  VIDEO_ACTIVE,
  GET_LIST_SERVICE_PACKAGE,
  SET_AI_CODE,
  SET_AI_NAME,
  SET_LIST_CAMERA,
  SET_LIST_CAMERA2,
  SET_PROVINCE_CODE_REPORT,
  SET_DISTRICT_CODE_REPORT,
  SET_CHECK_BG_REPORT,
  SET_SERVICE_CODE,
  GET_LIST_DISTRICT,
  GET_LIST_PROVINCE,
} from '../actions/reportAction';
const initialState = {
  reports: [],
  filter: {
    day: new Date(),
    time: new Date(),
    timeStart: '2023-08-10T17:00:00.000Z',
    timeEnd: '2023-08-11T16:59:00.000Z',
    service: 'Phát hiện chuyển động',
    ai_code: '20230222000000000001',
    name: 'Phát hiện chuyển động',
    record_status: 1,
    isBG: true,
    province_code: 'All',
    district_code: 'All',
  },
  isFullScreen: false,
  video_active: [
    {
      path: '',
      name: '',
    },
  ],
  package: [],
  camera: [],
  listCamera: {
    camera: [],
    code: '',
  },
  province: [],
  district: [],
};
const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_REPORT:
      return { ...state, reports: action.payload };
    case SET_DAY_REPORT:
      return {
        ...state,
        filter: {
          ...state.filter,
          day: action.payload,
        },
      };
    case SET_TIME_REPORT:
      return {
        ...state,
        filter: {
          ...state.filter,
          time: action.payload,
        },
      };
    case SET_TIME_END:
      return {
        ...state,
        filter: {
          ...state.filter,
          timeEnd: action.payload ? action.payload : '2023-08-11T16:59:00.000Z',
        },
      };
    case SET_TIME_START:
      return {
        ...state,
        filter: {
          ...state.filter,
          timeStart: action.payload
            ? action.payload
            : '2023-08-10T17:00:00.000Z',
        },
      };
    case SET_FULL_SCREEN:
      return { ...state, isFullScreen: !state.isFullScreen };
    case VIDEO_ACTIVE:
      return { ...state, video_active: [action.payload] };
    case GET_LIST_SERVICE_PACKAGE:
      return { ...state, package: action.payload };
    case SET_AI_CODE:
      return {
        ...state,
        filter: {
          ...state.filter,
          ai_code: action.payload,
        },
      };
    case SET_AI_NAME:
      return {
        ...state,
        filter: {
          ...state.filter,
          name: action.payload,
        },
      };
    case SET_LIST_CAMERA:
      return {
        ...state,
        camera: action.payload,
      };
    case SET_LIST_CAMERA2:
      return {
        ...state,
        listCamera: action.payload,
      };
    case SET_PROVINCE_CODE_REPORT:
      return {
        ...state,
        filter: {
          ...state.filter,
          province_code: action.payload,
          // province_name: action.payload.name,
        },
      };
    case SET_DISTRICT_CODE_REPORT:
      return {
        ...state,
        filter: {
          ...state.filter,
          district_code: action.payload,
          // district_name: action.payload.name,
        },
      };
    case SET_CHECK_BG_REPORT:
      return {
        ...state,
        filter: {
          ...state.filter,
          isBG: action.payload,
        },
      };
    case SET_SERVICE_CODE:
      return {
        ...state,
        filter: {
          ...state.filter,
          ai_code: action.payload,
        },
      };
    case GET_LIST_DISTRICT:
      return {
        ...state,
        district: action.payload,
      };
    case GET_LIST_PROVINCE:
      return {
        ...state,
        province: action.payload,
      };
    default:
      return state;
  }
};
export default reportReducer;
